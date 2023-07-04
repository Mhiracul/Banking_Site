const express = require("express");
const Deposit = require("../models/deposit");
const Transaction = require("../models/transaction");
const userModel = require("../models/user");
const DepositTemplate = require("../models/depositTemplate");
const nodemailer = require("nodemailer");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// API endpoint for handling deposit form submission
router.post("/deposits", authenticateToken, async (req, res) => {
  try {
    const {
      depositAmount,
      selectedMethod,
      selectedCryptoAddress,
      bankName,
      bankNumber,
    } = req.body;

    const userId = req.user._id;

    // Create a new deposit object
    const deposit = new Deposit({
      depositAmount,
      selectedMethod,
      selectedCryptoAddress,
      bankName,
      bankNumber,
      user: userId,
    });

    // Save the deposit object to the database
    const savedDeposit = await deposit.save();

    // Create a new transaction object
    const transaction = new Transaction({
      type: "deposit",
      date: new Date(),
      amount: savedDeposit.depositAmount,
      status: savedDeposit.status,
      user: savedDeposit.user,
    });

    savedDeposit.transaction = transaction._id;
    await savedDeposit.save();

    // Save the transaction
    await transaction.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mokeke250@gmail.com",
        pass: "lxvycnellvurscyl",
      },
    });

    const depositUser = await userModel.findById(userId);
    const formattedDate = savedDeposit.date;

    const template = await DepositTemplate.findOne({});
    const depositConfirmationTemplate = template?.depositContent || "";

    const mailOptions = {
      from: '"Finflow 👻" <mokeke250@gmail.com>',
      to: depositUser.email,
      subject: "Deposit Confirmation",
      html: depositConfirmationTemplate
        .replace("{userName}", depositUser.userName)
        .replace("{amount}", depositAmount)
        .replace("{selectedMethod}", selectedMethod)
        .replace("{selectedCrypto}", selectedCryptoAddress)
        .replace("{bankName}", bankName)
        .replace("{bankNumber}", bankNumber)
        .replace("{date}", formattedDate)
        .replace("{userName}", depositUser.userName)
        .replace("{transactionId}", savedDeposit._id)
        .replace("{balance}", depositUser.accountBalance),
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(savedDeposit);
  } catch (error) {
    console.error("Error creating deposit:", error);
    res.status(500).json({ error: "Failed to create deposit" });
  }
});

router.get("/total-deposit", authenticateToken, async (req, res) => {
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

//ADMIN ROUTES ************** ADMIN ROUTES ******** ADMIN ROUTES ************** ADMIN ROUTES ******** ADMIN ROUTES

router.get(
  "/admin/get-email-deposit",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const template = await DepositTemplate.findOne({});
      res.json({ depositConfirmationTemplate: template?.depositContent });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while retrieving the email template",
      });
    }
  }
);

router.put(
  "/admin/update-email-deposit",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { updatedDepositConfirmationTemplate } = req.body;
      const template = await DepositTemplate.findOne({});
      if (template) {
        template.depositContent = updatedDepositConfirmationTemplate;
        await template.save();
      } else {
        await DepositTemplate.create({
          depositContent: updatedDepositConfirmationTemplate,
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

router.get(
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

// Middleware function for token authentication

module.exports = router;
