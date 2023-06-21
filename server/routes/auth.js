const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { userModel, generateAccountNo } = require("../middlewares");

router.post("/signup", async (req, res) => {
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

    const user = new userModel({
      userName,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      role,
      accountNo, // Add the account number to the user object
    });
    await user.save();

    // Send registration email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mokeke250@gmail.com",
        pass: "lxvycnellvurscyl",
      },
    });

    const mailOptions = {
      from: "mokeke250@gmail.com",
      to: email,
      subject: "Registration Confirmation",
      html: `
          <h1>Welcome to Your Website</h1>
          <p>Thank you for registering!</p>
          <p>Your account number: ${accountNo}</p>
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

function generateAccountNo() {
  const length = 10;
  let accountNo = "";

  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
    accountNo += digit;
  }

  return accountNo;
  // Logic to generate an account number
  // You can use a random number generator or any other logic that suits your requirements
  // Ensure that the generated account number is unique and formatted as desired
}

// Login
router.post("/login", async (req, res) => {
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

module.exports = router;
