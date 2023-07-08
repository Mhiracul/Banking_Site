const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const EmailTemplate = require("../models/emailTemplate");
const userModel = require("../models/user");
const Loan = require("../models/loan");
const Savings = require("../models/savings");
const Withdrawal = require("../models/withdrawal");
const Newsletter = require("../models/Newsletter");
const VirtualCard = require("../models/virtualCard");
const FooterContent = require("../models/footerContent");
const HeaderContent = require("../models/headerContent");

const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

router.post("/signup", async (req, res) => {
  try {
    const {
      userName,
      password,
      firstName,
      lastName,
      email,
      confirmPassword,
      country,
      account,
      currency,
    } = req.body;

    // Check if username already exists
    const existingUser = await userModel.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const role = "user"; // Set the default role as "user"

    // Generate account number for the user
    const accountNo = generateAccountNo();

    // Generate OTP
    const otp = generateOTP();

    const user = new userModel({
      userName,
      password,
      firstName,
      lastName,
      email,
      role,
      accountNo, // Add the account number to the user object
      otp,
      country,
      account,
      currency, // Add the OTP to the user object
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
    const headerContent = await HeaderContent.findOne();
    const footerContent = await FooterContent.findOne();
    const template = await EmailTemplate.findOne({});
    const registrationConfirmationTemplate = template?.content || "";

    const mailOptions = {
      from: '"Finflow 👻" <mokeke250@gmail.com>',
      to: email,
      subject: "Registration Confirmation",
      html: `
      <div style="color: black; padding: 70px 10px; border-radius: 10px;">
      ${headerContent?.content || ""}
      <div style="color: black;">  ${registrationConfirmationTemplate}
      </div>

      <p style="color: #ccc; margin-top: 30px; font-size: 11px; border-top: 1px solid gray;">${
        footerContent?.content || ""
      }</p>
    </div>

    `
        .replace("{accountNo}", accountNo)
        .replace("{otp}", otp)
        .replace("{userName}", userName)
        .replace("{password}", password)
        .replace("{firstName}", firstName)
        .replace("{lastName}", lastName)
        .replace("{email}", email)
        .replace("{role}", role)
        .replace("{country}", country)
        .replace("{account}", account)
        .replace("{currency}", currency),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          error: "An error occurred while sending the registration email",
        });
      } else {
        console.log("Email sent:", info.response);
        res.status(201).json({ message: "User registered successfully" });
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
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
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { userName, password } = req.body;
  try {
    const user = await userModel.findOne({
      userName: { $regex: new RegExp(`^${userName}$`, "i") },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (password !== user.password) {
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

router.get("/login", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.user);
    const role = user.role;

    res.status(200).json({ loggedIn: true, role });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

router.post("/verify-otp", async (req, res) => {
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

router.put("/users/:userName", async (req, res) => {
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

router.put(
  "/profile",
  authenticateToken,

  async (req, res) => {
    const {
      email,
      phoneNumber,
      accountNumber,
      gender,
      tetherWalletAddress,
      bitcoinWalletAddress,
      image,
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
          image: image,
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
  }
);

router.get("/image", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.user._id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ image: user.image });
  } catch (error) {
    console.error("Error fetching user image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/accountno", authenticateToken, async (req, res) => {
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

router.get("/profile", authenticateToken, async (req, res) => {
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
        image: user.image,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ error: "Failed to retrieve profile" });
  }
});

router.get("/account", authenticateToken, async (req, res) => {
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

router.put("/account", authenticateToken, async (req, res) => {
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

router.get("/total-earnings", authenticateToken, async (req, res) => {
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

router.get("/users/:userId/balance", authenticateToken, (req, res) => {
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

//ADMIN ROUTES ************** ADMIN ROUTES ******** ADMIN ROUTES ************** ADMIN ROUTES ******** ADMIN ROUTES

router.get(
  "/admin/get-email-template",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const template = await EmailTemplate.findOne({});
      res.json({ registrationConfirmationTemplate: template?.content });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while retrieving the email template",
      });
    }
  }
);

router.put(
  "/admin/update-email-template",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { updatedRegistrationConfirmationTemplate } = req.body;
      const template = await EmailTemplate.findOne({});
      if (template) {
        template.content = updatedRegistrationConfirmationTemplate;
        await template.save();
      } else {
        await EmailTemplate.create({
          content: updatedRegistrationConfirmationTemplate,
        });
      }
      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the email template" });
    }
  }
);

router.put(
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

router.get(
  "/admin/users/:userId",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ data: user });
    } catch (err) {
      console.error("Failed to fetch user:", err);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  }
);
router.delete(
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
router.put(
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
router.put(
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
router.put(
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
/*
async function createAdminUser() {
  const adminUser = new userModel({
    firstName: "Admin",
    lastName: "Admin",
    userName: "Admins",
    email: "okekejuliet79@gmail.com",
    password: "12345",
    confirmPassword: "12345",
    role: "admin",
    otp: "12345",
    isVerified: "true",
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

router.post(
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
        user.accountBalance += Number(amount);

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

router.post(
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

// API endpoint to handle updating the email template
router.post(
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

router.get(
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

router.get(
  "/admin/users",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const users = await userModel.find({ role: "user" }); // Fetch users with role "user"
      res.send({ data: users });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch all users" });
    }
  }
);

router.put("/admin/newsletter", async (req, res) => {
  const { option, newsletterContent, userName } = req.body;

  try {
    let users;
    switch (option) {
      case "all":
        users = await userModel.find({}, "email");
        break;
      case "deposit":
        users = await userModel
          .find({ accountBalance: { $gt: 0 } })
          .select("email");
        break;

      case "loan":
        const loanUsers = await Loan.find({ status: "success" })
          .populate("user", "email")
          .select("user");
        users = loanUsers.map((loan) => loan.user);
        break;

      case "savings":
        const savingsUsers = await Savings.find({ status: "success" })
          .populate("user", "email")
          .select("user");
        users = savingsUsers.map((saving) => saving.user);
        break;

      case "withdrawal":
        const withdrawalUsers = await Withdrawal.find({ status: "success" })
          .populate("user", "email")
          .select("user");
        users = withdrawalUsers.map((withdrawal) => withdrawal.user);
        break;

      case "virtualCard":
        const virtualCardUsers = await VirtualCard.find({})
          .populate("user", "email")
          .select("user");
        users = virtualCardUsers.map((virtualCard) => virtualCard.user);
        break;

      case "specificUser":
        const specificUser = await userModel.findOne({ userName }, "email");
        users = specificUser ? [specificUser] : [];
        break;
      default:
        return res.status(400).json({ message: "Invalid option" });
    }

    const userEmails = users.map((user) => user.email);

    if (userEmails.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found for the selected option" });
    }

    const headerContent = await HeaderContent.findOne();
    const footerContent = await FooterContent.findOne();
    const newsletter = new Newsletter({
      option,
      newsletterContent,
      userName,

      sentTo: [],
    });
    await newsletter.save();
    const formattedContent = newsletterContent.replace(/\n/g, "<br/>");

    // Send email to each user using nodemailer
    for (const userEmail of userEmails) {
      const emailBody = `
      <div style="color: white; background-color: #272727; padding: 70px 10px; border-radius: 10px;">
      ${headerContent?.content || ""}
        <p style="color: white; margin-bottom: 10px;">
        ${formattedContent}
      </p>
      <p style="color: #696969; margin-top: 30px; font-size: 6px; border-top: 1px solid gray;">${
        footerContent?.content || ""
      }</p>
      </div>
    `;

      // Implement the email sending logic here
      // Use the `userEmail` and `newsletterContent` variables as needed
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mokeke250@gmail.com",
          pass: "lxvycnellvurscyl",
        },
      });

      const mailOptions = {
        from: '"Finflow " <mokeke250@gmail.com>',
        to: userEmail,
        subject: "Newletter",
        html: emailBody,
      };

      // Send the email using nodemailer or any other email sending library
      // Example using nodemailer:
      await transporter.sendMail(mailOptions);
    }

    res.json({ message: "Newsletter sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/admin/newsletter", async (req, res) => {
  try {
    const newsletter = await Newsletter.findOne().sort({ createdAt: -1 });
    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    res.json(newsletter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// Save header and footer content to the database

module.exports = router;
