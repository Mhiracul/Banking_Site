const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
const PORT = process.env.PORT || 4000;

const mongo = process.env.MONGODB_URL;

mongoose
  .connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo connection successful"))
  .catch(() => console.log("Mongo connection failed"));

const EMAIL_USER = "mokeke185@gmail.com";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  accountBalance: {
    type: Number,
    default: 0,
  },
  role: String,
  phoneNumber: String,
  accountNumber: String,
  accountNo: String,
  bitcoinWalletAddress: String,
  tetherWalletAddress: String,

  status: {
    type: String,
    enum: ["suspended", "activated", "disabled"],
    default: "activated",
  },
  gender: String,
  pendingRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  lastSavingsDate: Date,
  earnings: {
    type: Number,
    default: 0,
  },
  otp: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("users", UserSchema);

const authenticateToken = (req, res, next) => {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = decoded; // Set the decoded user information
    next();
  });
};

// Middleware to authorize admin
// Middleware to authorize admin
const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user);
    const getRole = user.role;

    console.log("User ID:", req.user); // Log the user ID for verification
    console.log("User role:", getRole); // Log the user role

    if (getRole !== "admin") {
      console.log("Access denied for non-admin user");
      return res.status(403).json({ error: "Access denied" });
    }

    console.log("Access granted for admin user");
    next();
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const authorizeUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user);
    const getRole = user.role;

    console.log("User ID:", req.user); // Log the user ID for verification
    console.log("User role:", getRole); // Log the user role

    if (getRole !== "user") {
      console.log("Access denied for non-user");
      return res.status(403).json({ error: "Access denied" });
    }

    console.log("Access granted for user");
    next();
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

app.get("/", (req, res) => {
  res.send("server is running");
});

app.get("/admin", authenticateToken, authorizeAdmin, (req, res) => {
  // This route handler will only be executed if the user is an admin

  res.send({ message: "Welcome to the admin-only route!", alert: true });
});

// Register a new user
// Backend API route
app.get(
  "/admin/user/count",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const count = await userModel.countDocuments();
      res.json({ count });
    } catch (error) {
      console.error("Error retrieving user count:", error);
      res.status(500).json({ error: "Failed to retrieve user count" });
    }
  }
);

const crypto = require("crypto");

app.post("/signup", async (req, res) => {
  try {
    const { userName, password, firstName, lastName, email, confirmPassword } =
      req.body;

    // Check if username already exists
    const existingUser = await userModel.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = "user"; // Set the default role as "user"

    // Generate account number for the user
    const accountNo = generateAccountNo();

    // Generate OTP
    const otp = generateOTP();

    const user = new userModel({
      userName,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      role,
      accountNo, // Add the account number to the user object
      otp, // Add the OTP to the user object
    });
    await user.save();

    // Send registration email with OTP
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mokeke250@gmail.com",
        pass: "lxvycnellvurscyl",
      },
    });

    const mailOptions = {
      from: '"Finflow 👻" <mokeke250@gmail.com>',
      to: email,
      subject: "Registration Confirmation",
      html: `
        <h1>Welcome to FinFlow</h1>
        <p>Thank you for registering!</p>
        <p>Your account number: ${accountNo}</p>
        <p>Your OTP: ${otp}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        // Handle error
      } else {
        console.log("Email sent:", info.response);
        // Handle success
      }
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
});

function generateOTP() {
  const otpLength = 6;
  const otp = crypto
    .randomInt(Math.pow(10, otpLength - 1), Math.pow(10, otpLength) - 1)
    .toString();
  return otp;
}
function generateAccountNo() {
  const length = 10;
  let accountNo = "";

  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
    accountNo += digit;
  }

  return accountNo;
}

// Login
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { userName, password } = req.body;
  try {
    const user = await userModel.findOne({ userName });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check if the user's status is disabled or suspended
    if (user.status === "disabled") {
      return res
        .status(401)
        .json({ message: "Your account has been disabled" });
    }

    if (user.status === "suspended") {
      return res
        .status(401)
        .json({ message: "Your account has been suspended" });
    }

    const dataSend = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      accountBalance: user.accountBalance,
      role: user.role,
      status: user.status,
    };

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({
      message: "Login is successful",
      alert: true,
      data: dataSend,
      token: token,
    });
  } catch (error) {
    console.error("Failed to login:", error);
    res.status(500).json({ message: "Failed to login" });
  }
});

// Import required packages

// Edit user data
app.put(
  "/admin/users/:userId",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { userId } = req.params; // Use "id" instead of "userId"

    const { userName, email, password, accountBalance } = req.body;
    try {
      // Find the user by ID
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update the user's properties
      user.userName = userName;
      user.email = email;
      user.password = password;
      user.accountBalance = accountBalance;

      // Save the updated user
      const updatedUser = await user.save();

      res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Failed to update user data:", error);
      res.status(500).json({ message: "Failed to update user data" });
    }
  }
);
app.delete(
  "/admin/users/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Find the user by ID and delete it
      const deletedUser = await userModel.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return a success message or updated user list
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Failed to delete user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  }
);
// Suspend a user
app.put(
  "/admin/users/:id/suspend",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Find the user by ID
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Set the role of the user to "suspended"
      user.status = "suspended";

      // Save the updated user
      await user.save();

      res.status(200).json({ message: "User suspended successfully", user });
    } catch (error) {
      console.error("Failed to suspend user:", error);
      res.status(500).json({ message: "Failed to suspend user" });
    }
  }
);

// Disable a user
app.put(
  "/admin/users/:id/disable",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Find the user by ID
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Set the isDisabled flag to true
      user.status = "disabled";

      // Save the updated user
      await user.save();

      res.status(200).json({ message: "User disabled successfully", user });
    } catch (error) {
      console.error("Failed to disable user:", error);
      res.status(500).json({ message: "Failed to disable user" });
    }
  }
);

// Activate a user
app.put(
  "/admin/users/:id/activate",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Find the user by ID
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Set the isSuspended and isDisabled flags to false
      user.status = "activated";

      // Save the updated user
      await user.save();

      res.status(200).json({ message: "User activated successfully", user });
    } catch (error) {
      console.error("Failed to activate user:", error);
      res.status(500).json({ message: "Failed to activate user" });
    }
  }
);

// Add the following route handler to update the account balance by userName
app.put("/users/:userName", async (req, res) => {
  const { userName } = req.params;
  const { newBalance } = req.body;

  try {
    const user = await userModel.findOneAndUpdate(
      { userName: userName },
      { $set: { accountBalance: newBalance } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account balance updated successfully" });
  } catch (error) {
    console.error("Error updating account balance:", error);
    res.status(500).json({ error: "Failed to update account balance" });
  }
});
// Update user profile

app.put("/profile", authenticateToken, async (req, res) => {
  const {
    email,
    phoneNumber,
    accountNumber,
    gender,
    tetherWalletAddress,
    bitcoinWalletAddress,
  } = req.body;

  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        email,
        phoneNumber,
        accountNumber,
        gender,
        bitcoinWalletAddress,
        tetherWalletAddress,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

app.get("/accountno", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });

    if (user) {
      res.status(200).json({ accountNo: user.accountNo });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving account number:", error);
    res.status(500).json({ error: "Failed to retrieve account number" });
  }
});

app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });

    if (user) {
      res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        accountNumber: user.accountNumber,
        gender: user.gender,
        bitcoinWalletAddress: user.bitcoinWalletAddress,
        tetherWalletAddress: user.tetherWalletAddress,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ error: "Failed to retrieve profile" });
  }
});

// Login
// Login
app.get("/login", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.user);
    const role = user.role;

    res.status(200).json({ loggedIn: true, role });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

app.get("/account", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });

    if (user) {
      const accountBalance = user.accountBalance;
      res.status(200).json({ accountBalance });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching account balance:", error);
    res.status(500).json({ error: "Failed to fetch account balance" });
  }
});

app.put("/account", authenticateToken, async (req, res) => {
  try {
    const { accountBalance } = req.body;
    const userId = req.user._id; // Assuming you have authentication middleware to extract the user ID

    // Update the user's account balance
    await userModel.findByIdAndUpdate(userId, { accountBalance });

    res.status(200).json({ message: "Account balance updated successfully." });
  } catch (error) {
    console.error("Error updating account balance:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the account balance." });
  }
});

/*async function createAdminUser() {
  const adminUser = new userModel({
    firstName: "Okeke",
    lastName: "Miracle",
    userName: "ADMIN",
    email: "mokeke250@gmail.com",
    password: "Miracle25",
    confirmPassword: "Miracle25",
    role: "admin"
  });

  try {
    await adminUser.save();
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error saving model:", error);
  }
}

createAdminUser();
*/
// Call the asynchronous function
app.get("/users/:userId/balance", authenticateToken, (req, res) => {
  const { userId } = req.params;

  userModel
    .findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const balance = user.accountBalance;
      res.json({ balance });
    })
    .catch((error) => {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post(
  "/admin/users/:userId/balance/add",
  authenticateToken,
  authorizeAdmin,
  (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;
    userModel
      .findOne({ _id: userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Apply penalty to the user's account balance
        user.accountBalance += amount;

        // Save the updated user
        return user.save();
      })
      .then((updatedUser) => {
        const balance = updatedUser.accountBalance;
        res.json({ balance });
      })
      .catch((error) => {
        console.log("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  }
);

app.post(
  "/admin/users/:userId/penalty",
  authenticateToken,
  authorizeAdmin,
  (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    userModel
      .findOne({ _id: userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Apply penalty to the user's account balance
        user.accountBalance -= amount;

        // Save the updated user
        return user.save();
      })
      .then((updatedUser) => {
        const balance = updatedUser.accountBalance;
        res.json({ balance });
      })
      .catch((error) => {
        console.log("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  }
);

const emailTemplateSchema = new mongoose.Schema({
  adminNote: String,
  template: String,
});

const EmailTemplate = mongoose.model("EmailTemplate", emailTemplateSchema);

// API endpoint to handle updating the email template
app.post(
  "/admin/update-email-template",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { adminNote, template } = req.body;

    try {
      // Update the email template in the database or storage system
      const updatedEmailTemplate = await EmailTemplate.findOneAndUpdate(
        {},
        { adminNote, template },
        { new: true, upsert: true }
      );

      res.status(200).json({
        message: "Email template updated successfully",
        emailTemplate: updatedEmailTemplate,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

const virtualCardSchema = new mongoose.Schema({
  cardType: String,
  name: String,
});

// Create a Mongoose model for the virtual card
const VirtualCard = mongoose.model("VirtualCard", virtualCardSchema);

// Define a route to handle the card registration form submission
app.post("/virtual-cards", authenticateToken, async (req, res) => {
  try {
    const { cardType, name } = req.body;

    const card = new VirtualCard({
      cardType,
      name,
    });

    await card.save();
    res.status(201).json(card);
  } catch (error) {
    console.error("Error saving virtual card:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the virtual card." });
  }
});
// Backend API route
app.get(
  "/admin/virtual-cards",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const cards = await VirtualCard.find();
      res.json(cards);
    } catch (error) {
      console.error("Error retrieving virtual cards:", error);
      res.status(500).json({ error: "Failed to retrieve virtual cards" });
    }
  }
);

const withdrawalSchema = new mongoose.Schema({
  type: String,
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "success"],
    default: "pending",
  },
  amount: Number,
  wallet: {
    type: String,
    default: null,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Update this line
  transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }, // Reference to the Transaction schema
});

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);

const generateReceiptContent = (withdrawal, withdrawalUser) => {
  const { type, wallet, amount, date } = withdrawal;

  // Customizable content by the admin
  const adminNote =
    "A new withdrawal request just occured in your finflow account.";

  // Receipt HTML template
  return `
    <html>
      <head>
      <style>
      .amount {
        color: rgb(255, 0, 0);
        font-weight: bolder;
        background: rgb(81, 81, 81);
        padding: 3px 10px;
        border-radius: 5px;
      }
      .amount strong {
        color: white;
      }
      .receipt {
        background: black;
        border-radius: 10px;
        box-shadow: #ccc 5px 5px 5px;
        margin: auto;
        width: 90%;
        color: white;
        font-family: "Courier New", Courier, monospace;
        padding: 70px 10px;
      }
      .date {
        background: rgb(81, 81, 81);
        padding: 3px 10px;
        border-radius: 5px;
      }
      .mine {
        padding: 3px 10px;
      }
      img {
        margin: auto;
        display: flex;
      }
      h1 {
        font-size: 17px;
      }
      h2 {
        font-size: 20px;
        font-weight : bold;
      }
    </style>
      </head>
      <body>
      <div class="receipt">
      <img
        src="https://finflow.uicore.co/online-banking/wp-content/uploads/sites/2/2023/01/finflow-logo-1.webp"
        alt=""
        width="70"
        height="20"
      />
      <h2> Hey,${withdrawalUser.userName} </h2>
      <h1>Withdrawal Receipt</h1>
      <p class="amount"><strong>Amount: $</strong>${amount}</p>
      <p class="mine"><strong>Type:</strong> ${wallet}</p>
      <p class="mine"><strong>Type:</strong> ${type}</p>
      <p class="date"><strong>Date:</strong> ${date.toISOString()}</p>
      <p class="mine">
        <strong>User:</strong> ${withdrawalUser.userName}
      </p>
      <p class="date">
        <strong>Transaction ID:</strong> ${withdrawal._id} 
      </p>
      <p class="mine"><strong>Balance:$</strong>${
        withdrawalUser.accountBalance
      }</p>
      <p class="date"><strong>Note:</strong> ${adminNote}</p>
    </div>
      </body>
    </html>
  `;
};

// Send receipt email function
const sendReceiptEmail = async (user, receiptContent) => {
  try {
    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mokeke250@gmail.com",
        pass: "lxvycnellvurscyl",
      },
    });

    const mailOptions = {
      from: '"Finflow 👻" <mokeke250@gmail.com>',
      to: user.email,
      subject: "Withdrawal Receipt",
      html: receiptContent,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

// Route to handle user withdrawal
app.post("/withdrawal", authenticateToken, async (req, res) => {
  const { type, wallet, amount } = req.body;
  const userId = req.user._id;

  try {
    const withdrawal = new Withdrawal({ type, wallet, amount, user: userId });
    const result = await withdrawal.save();

    const transaction = new Transaction({
      type: "withdrawal",
      date: result.date,
      amount: result.amount,
      status: result.status,
      user: result.user,
    });
    const savedTransaction = await transaction.save();

    result.transaction = savedTransaction._id;

    await result.save();

    // Save the transaction
    //const emailTemplate = await EmailTemplate.findOne({}); // Modify this line to fetch the email template from your database or storage system

    // Update the user's pending requests
    await userModel.findByIdAndUpdate(userId, {
      $push: { pendingRequests: result._id },
    });

    // Deduct the withdrawal amount from the user's account balance
    const user = await userModel.findById(userId);
    user.accountBalance -= amount;

    await user.save();

    // Generate and send the receipt to the user's email
    const withdrawalUser = await userModel.findById(userId);
    const receiptContent = generateReceiptContent(result, withdrawalUser);
    sendReceiptEmail(withdrawalUser, receiptContent);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to handle updating the email template

app.get("/total-withdrawal", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const withdrawals = await Withdrawal.find({ user: userId });
    let totalWithdrawal = 0;

    for (const withdrawal of withdrawals) {
      totalWithdrawal += withdrawal.amount;
    }

    res.json({ totalWithdrawal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
// server.js or routes file
/*app.get("/transactions/pending/count", async (req, res) => {
  try {
    const count = await Withdrawal.countDocuments({ status: "pending" });
    res.json({ count });
  } catch (error) {
    console.error("Error counting pending transactions:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}); */

app.put("/receipts/:id", async (req, res) => {
  try {
    const receiptId = req.params.id;
    const updatedReceiptData = req.body;

    // Find the receipt in the database
    const receipt = await Withdrawal.findByIdAndUpdate(
      receiptId,
      updatedReceiptData,
      { new: true }
    );

    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    res.status(200).json({ message: "Receipt updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the receipt" });
  }
});

app.put(
  "/withdrawals/:withdrawalId/process",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { withdrawalId } = req.params;

    try {
      const withdrawal = await Withdrawal.findById(withdrawalId);
      if (!withdrawal) {
        return res.status(404).json({ error: "Withdrawal request not found" });
      }

      // Update the withdrawal status to success
      withdrawal.status = "success";
      await withdrawal.save();

      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.get("/withdrawal", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const data = await Withdrawal.find({ user: userId });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch withdrawals" });
  }
});

app.get(
  "/admin/withdrawals",
  authenticateToken,
  authorizeAdmin,

  async (req, res) => {
    try {
      const withdrawals = await Withdrawal.find().populate("user", "userName");
      res.status(200).json({ withdrawals });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch withdrawals" });
    }
  }
);

app.patch(
  "/admin/withdrawals/:id",
  authenticateToken,
  authorizeAdmin,

  async (req, res) => {
    const withdrawalId = req.params.id;
    const { status } = req.body;

    try {
      const withdrawal = await Withdrawal.findById(withdrawalId);
      if (!withdrawal) {
        return res.status(404).json({ error: "Withdrawal not found" });
      }

      withdrawal.status = status;
      const updatedWithdrawal = await withdrawal.save();
      res.status(200).json({ withdrawal: updatedWithdrawal });
    } catch (error) {
      res.status(500).json({ error: "Failed to update withdrawal status" });
    }
  }
);

// API endpoint to fetch users
app.get("/admin/users", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const users = await userModel.find({ role: "user" }); // Fetch users with role "user"
    res.send({ data: users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all users" });
  }
});

// Fetch all users from the database

const depositSchema = new mongoose.Schema({
  depositAmount: {
    type: Number,
    required: true,
  },
  selectedMethod: {
    type: String,
    enum: ["crypto", "wire-transfer"],
    required: true,
  },
  selectedCrypto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cryptocurrency",
  },
  bankName: {
    type: String,
    required: function () {
      return this.selectedMethod === "wire-transfer";
    },
  },
  status: {
    type: String,
    enum: ["pending", "success"],
    default: "pending",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Update this line
  transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }, // Reference to the Transaction schema
});

const Deposit = mongoose.model("Deposit", depositSchema);

// Assuming you have already set up the required dependencies and middleware

// API endpoint for handling deposit form submission
app.post("/deposits", authenticateToken, async (req, res) => {
  try {
    const { depositAmount, selectedMethod, selectedCrypto, bankName, user } =
      req.body;

    const userId = req.user._id;

    // Create a new deposit object
    const deposit = new Deposit({
      depositAmount,
      selectedMethod,
      selectedCrypto,
      bankName,
      user: userId,
    });

    // Save the deposit object to the database
    const savedDeposit = await deposit.save();
    const transaction = new Transaction({
      type: "deposit",
      date: savedDeposit.date, // Use savedDeposit instead of result
      amount: savedDeposit.depositAmount, // Use savedDeposit instead of result
      status: savedDeposit.status, // Use savedDeposit instead of result
      user: savedDeposit.user, // Use savedDeposit instead of result
    });
    savedDeposit.transaction = transaction._id;
    await savedDeposit.save();

    // Save the transaction
    await transaction.save();

    res.status(201).json(savedDeposit);
  } catch (error) {
    console.error("Error creating deposit:", error);
    res.status(500).json({ error: "Failed to create deposit" });
  }
});

app.get(
  "/admin/deposits/total",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const deposits = await Deposit.find();
      let totalAmount = 0;

      for (const deposit of deposits) {
        totalAmount += parseFloat(deposit.depositAmount);
      }

      res.json({ totalAmount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

app.get("/total-deposit", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const deposits = await Deposit.find({ user: userId });
    let totalDeposit = 0;

    for (const deposit of deposits) {
      totalDeposit += parseFloat(deposit.depositAmount);
    }

    res.json({ totalDeposit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const cryptoWalletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  active: {
    type: Boolean,
    enum: ["false", "true"],
    default: true,
  },
});

const CryptoWallet = mongoose.model("CryptoWallet", cryptoWalletSchema);

app.post(
  "/admin/cryptos",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const cryptos = req.body;
      const savedCryptos = await CryptoWallet.create(cryptos);
      res.json(savedCryptos);
    } catch (error) {
      console.error("Error saving wallet addresses:", error);
      res.status(500).json({ error: "Failed to save wallet addresses" });
    }
  }
);

// Get all wallet addresses
app.get("/cryptos", async (req, res) => {
  try {
    const cryptos = await CryptoWallet.find({ active: true });
    res.json(cryptos);
  } catch (error) {
    console.error("Error fetching wallet addresses:", error);
    res.status(500).json({ error: "Failed to fetch wallet addresses" });
  }
});

app.get(
  "/admin/cryptos",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const cryptos = await CryptoWallet.find();
      res.json(cryptos);
    } catch (error) {
      console.error("Error fetching cryptocurrencies:", error);
      res.status(500).json({ error: "Failed to fetch cryptocurrencies" });
    }
  }
);

// PUT /admin/cryptos/:id - Update the status of a specific cryptocurrency
app.put(
  "/admin/cryptos/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const cryptoId = req.params.id;
    const { active } = req.body;

    try {
      const updatedCrypto = await CryptoWallet.findByIdAndUpdate(
        cryptoId,
        { active },
        { new: true }
      );

      if (!updatedCrypto) {
        return res.status(404).json({ error: "Cryptocurrency not found" });
      }

      res.json(updatedCrypto);
    } catch (error) {
      console.error("Error updating cryptocurrency status:", error);
      res.status(500).json({ error: "Failed to update cryptocurrency status" });
    }
  }
);

/*const cryptoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  walletAddress: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

app.get("/cryptocurrencies", async (req, res) => {
  try {
    const cryptocurrencies = await Crypto.find({ isActive: true });
    res.json(cryptocurrencies);
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error);
    res.status(500).json({ error: "Failed to fetch cryptocurrencies" });
  }
});

app.post(
  "/cryptocurrencies",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const newCrypto = await Crypto.create(req.body);
      res.json(newCrypto);
    } catch (error) {
      console.error("Error adding cryptocurrency:", error);
      res.status(500).json({ error: "Failed to add cryptocurrency" });
    }
  }
);

app.put(
  "/cryptocurrencies/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { id } = req.params;
    try {
      const crypto = await Crypto.findById(id);
      crypto.isActive = !crypto.isActive;
      const updatedCrypto = await crypto.save();
      res.json(updatedCrypto);
    } catch (error) {
      console.error("Error toggling cryptocurrency:", error);
      res.status(500).json({ error: "Failed to toggle cryptocurrency" });
    }
  }
);
*/
app.post("/verify-otp", async (req, res) => {
  try {
    const { userName, otp } = req.body;
    console.log("Request Body:", req.body);

    // Find the user by their username
    const user = await userModel.findOne({ userName });
    console.log("User:", user);
    // Check if the user exists
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare the provided OTP with the stored OTP
    if (otp !== user.otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Update the user's status to verified or perform any other necessary actions
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "OTP verification successful" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while verifying OTP" });
  }
});

const dynamicValuesSchema = new mongoose.Schema({
  message: String,
  reasons: [String],
});

const DynamicValues = mongoose.model("DynamicValues", dynamicValuesSchema);

// GET endpoint to retrieve dynamic values
app.post(
  "/admin/dynamic-values",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      // Assuming the request body contains the updated dynamic values
      const updatedDynamicValues = req.body;

      // Find the dynamic values document in the database (assuming there's only one document)
      const dynamicValues = await DynamicValues.findOne();

      if (dynamicValues) {
        // Update the dynamic values in the database
        dynamicValues.message = updatedDynamicValues.message;
        dynamicValues.reasons = updatedDynamicValues.reasons;

        await dynamicValues.save();

        res.json({ message: "Dynamic values updated successfully" });
      } else {
        // Create a new document if it doesn't exist
        await DynamicValues.create(updatedDynamicValues);
        res.json({ message: "Dynamic values created successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  }
);

// ...

app.get("/dynamic-values", authenticateToken, async (req, res) => {
  try {
    // Find the dynamic values document in the database (assuming there's only one document)
    const dynamicValues = await DynamicValues.findOne();

    if (dynamicValues) {
      res.json(dynamicValues);
    } else {
      res.status(404).json({ error: "Dynamic values not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

const cardData = {
  name: "Virtual Card",
  description: "This is a virtual card for demonstration purposes",
  imageUrl:
    "https://img.freepik.com/premium-psd/credit-card-mockup-design-3d-rendering_308376-76.jpg?size=626&ext=jpg&ga=GA1.1.642060606.1680809827&semt=ais",
  number: "1234 5678 9012 3456",
  expMonth: "12",
  expYear: "2024",
};

app.get("/card", (req, res) => {
  res.json(cardData);
});

const loanSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  installments: [{ amount: Number, dueDate: Date }],
  status: {
    type: String,
    enum: ["pending", "success"],
    default: "pending",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }, // Reference to the Transaction schema
});

const Loan = mongoose.model("Loan", loanSchema);

app.post("/loans", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const { amount, installments } = req.body; // Add amount field to the destructuring assignment

  try {
    console.log("Request body:", req.body);
    console.log("Amount:", amount);

    const loan = new Loan({ amount, installments, user: userId });
    console.log("Loan object:", loan);

    const savedLoan = await loan.save();

    console.log("Loan saved successfully");
    const transaction = new Transaction({
      type: "loan",
      date: savedLoan.date,
      amount: savedLoan.amount,
      status: savedLoan.status,
      user: savedLoan.user,
    });

    const savedTransaction = await transaction.save();

    savedLoan.transaction = savedTransaction._id;
    await savedLoan.save();

    res.status(201).json({ message: "Loan payment recorded successfully" });
  } catch (error) {
    console.error("Error saving loan payment:", error);
    res.status(500).json({ error: "Failed to record loan payment" });
  }
});

app.get("/loans", authenticateToken, async (req, res) => {
  const userName = req.user.userName;

  try {
    const loans = await Loan.find({ user: userName });
    res.status(200).json(loans);
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).json({ error: "Failed to fetch loans" });
  }
});

const settingsSchema = new mongoose.Schema({
  interestRate: {
    type: Number,
    default: 5,
  },
});
const Settings = mongoose.model("Settings", settingsSchema);

const getInterestRate = async () => {
  try {
    const settings = await Settings.findOne();
    if (settings) {
      return settings.interestRate;
    } else {
      // Default interest rate if no settings document exists
      return 5;
    }
  } catch (error) {
    console.error("Error retrieving interest rate:", error);
    // Default interest rate in case of an error
    return 5;
  }
};

// Create a Savings model
const savingsSchema = new mongoose.Schema({
  amount: Number,
  duration: String,
  reason: String,
  status: {
    type: String,
    enum: ["pending", "success"],
    default: "pending",
  },
  releaseDate: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }, // Reference to the Transaction schema
});
const Savings = mongoose.model("Savings", savingsSchema);

// Create a new savings entry
app.post("/savings", authenticateToken, async (req, res) => {
  try {
    const { amount, duration, reason } = req.body;
    const userId = req.user._id; // Assuming you have authentication middleware to extract the user ID

    // Convert amount to a number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return res
        .status(400)
        .json({ error: "Invalid amount. Amount must be a number." });
    }

    // Calculate release date based on duration
    const releaseDate = new Date();
    if (duration === "30days") {
      releaseDate.setDate(releaseDate.getDate() + 30);
    } else if (duration === "3months") {
      releaseDate.setMonth(releaseDate.getMonth() + 3);
    } else if (duration === "6months") {
      releaseDate.setMonth(releaseDate.getMonth() + 6);
    } else if (duration === "1year") {
      releaseDate.setFullYear(releaseDate.getFullYear() + 1);
    }

    // Calculate daily addition based on the current interest rate
    const interestRate = await getInterestRate(); // Function to retrieve the current interest rate
    const dailyAddition = (parsedAmount * (interestRate / 100)) / 365;

    // Create a new Savings entry
    const savings = new Savings({
      amount: parsedAmount, // Use the parsed amount
      duration,
      reason,
      releaseDate,
      dailyAddition,
    });

    const savedSavings = await savings.save();
    console.log("Savings saved successfully");

    const transaction = new Transaction({
      type: "savings",
      date: savedSavings.date,
      amount: savedSavings.amount,
      status: savedSavings.status,
      user: savedSavings.user,
    });

    const savedTransaction = await transaction.save();
    savedSavings.transaction = savedTransaction._id;
    await savedSavings.save();

    // Deduct the savings amount from the user's account balance
    const user = await userModel.findById(userId);
    user.accountBalance -= parsedAmount; // Deduct the parsed amount from the account balance
    user.earnings += dailyAddition;
    user.accountBalance += dailyAddition;

    await user.save();

    res
      .status(201)
      .json({ message: "Savings created successfully.", interestRate });
  } catch (error) {
    console.error("An error occurred while creating savings:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating savings." });
  }
});

// Assuming you have a route to fetch the total earnings for a user
app.get("/total-earnings", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have authentication middleware to extract the user ID

    const user = await userModel.findById(userId);
    const totalEarnings = user.earnings;

    res.json({ totalEarnings });
  } catch (error) {
    console.error(
      "An error occurred while fetching the total earnings:",
      error
    );
    res.status(500).json({ error: "Failed to fetch total earnings" });
  }
});

// Assuming you're using Express.js
app.get("/interest-rate", authenticateToken, (req, res) => {
  try {
    const interestRate = getInterestRate(); // Replace with your logic to fetch the interest rate from the database or any other data source
    res.json({ interestRate });
  } catch (error) {
    console.error("An error occurred while fetching the interest rate:", error);
    res.status(500).json({ error: "Failed to fetch interest rate" });
  }
});

app.put(
  "/admin/interest-rate",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { interestRate } = req.body;

      // Check if a settings document exists
      let settings = await Settings.findOne();

      // If no settings document exists, create a new one
      if (!settings) {
        settings = new Settings();
      }

      // Update the interest rate in the settings document
      settings.interestRate = interestRate;
      await settings.save();

      res.status(200).json({ message: "Interest rate updated successfully." });
    } catch (error) {
      console.error("Error updating interest rate:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the interest rate." });
    }
  }
);

// Get all savings entries
app.get("/savings", async (req, res) => {
  try {
    const savings = await Savings.find().maxTimeMS(30000);
    res.json(savings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching savings." });
  }
});

/*const transactionSchema = new mongoose.Schema({
  type: String,
  withdrawal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Withdrawal",
  },
  loan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loan",
  },
});

// Define the Transaction model
const Transaction = mongoose.model("Transaction", transactionSchema);

// Define the API route to fetch transaction history
app.get("/transactions", authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("withdrawal")
      .populate("loan")
      .sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
*/

const transactionSchema = new mongoose.Schema({
  type: String, // Type of transaction (e.g., "savings", "loan", "withdrawal")
  date: { type: Date, default: Date.now },
  amount: Number,
  status: {
    type: String,
    enum: ["pending", "success"],
    default: "pending",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

app.get("/transactions", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is stored in req.user.id after authentication

    // Retrieve transactions for the logged-in user from the Transaction model
    const transactions = await Transaction.find({ user: userId }).exec();

    // Format the transactions
    const formattedTransactions = transactions.map((transaction) => {
      return {
        type: transaction.type,
        date: transaction.date.toISOString().split("T")[0], // Extract only the date part
        amount: transaction.amount,
        status: transaction.status,
        user: transaction.user,
      };
    });

    res.json(formattedTransactions);
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    res.status(500).json({ error: "Failed to retrieve transaction history" });
  }
});

app.get(
  "/admin/transaction",
  authenticateToken,
  authorizeAdmin,

  async (req, res) => {
    try {
      const transactions = await Transaction.find().populate(
        "user",
        "userName"
      );
      res.status(200).json({ transactions });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch withdrawals" });
    }
  }
);

app.patch(
  "/admin/transaction/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const transactionId = req.params.id;
    const { status } = req.body;

    try {
      const transaction = await Transaction.findById(transactionId);

      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      const previousStatus = transaction.status;
      transaction.status = status;
      const updatedTransaction = await transaction.save();

      if (previousStatus !== status) {
        if (transaction.type === "deposit") {
          const deposit = await Deposit.findOne({
            transaction: updatedTransaction._id,
          });

          if (!deposit) {
            return res.status(404).json({ error: "Deposit not found" });
          }

          deposit.status = status;
          await deposit.save();
        } else if (transaction.type === "withdrawal") {
          const withdrawal = await Withdrawal.findOne({
            transaction: updatedTransaction._id,
          });

          if (!withdrawal) {
            return res.status(404).json({ error: "Withdrawal not found" });
          }

          withdrawal.status = status;
          await withdrawal.save();
        } else if (transaction.type === "loan") {
          const loan = await Loan.findOne({
            transaction: updatedTransaction._id,
          });

          if (!loan) {
            return res.status(404).json({ error: "Loan not found" });
          }

          loan.status = status;
          await loan.save();
        } else if (transaction.type === "savings") {
          const savings = await Savings.findOne({
            transaction: updatedTransaction._id,
          });

          if (!savings) {
            return res.status(404).json({ error: "Savings not found" });
          }

          savings.status = status;
          await savings.save();
        }
      }

      res.status(200).json(updatedTransaction);
    } catch (error) {
      console.error("Error updating transaction:", error);
      res.status(500).json({ error: "Failed to update transaction" });
    }
  }
);

app.get(
  "/admin/transactions/pending/count",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const count = await Transaction.countDocuments({ status: "pending" });
      res.json({ count });
    } catch (error) {
      console.error("Error counting pending transactions:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
