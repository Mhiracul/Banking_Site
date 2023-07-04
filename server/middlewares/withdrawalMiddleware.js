const express = require("express");
const Withdrawal = require("../models/withdrawal");
const Transaction = require("../models/transaction");
const userModel = require("../models/user");
const WithdrawTemplate = require("../models/withdrawalTemplate");
const nodemailer = require("nodemailer");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/withdrawal", authenticateToken, async (req, res) => {
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
    // const emailTemplate = await EmailTemplate.findOne({}); // Modify this line to fetch the email template from your database or storage system

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
    const adminNote =
      "A new withdrawal request just occurred in your Finflow account.";
    const formattedDate = result.date.toISOString();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mokeke250@gmail.com",
        pass: "lxvycnellvurscyl",
      },
    });
    const template = await WithdrawTemplate.findOne({});
    const withdrawalConfirmationTemplate = template?.withdrawContent || "";

    const mailOptions = {
      from: '"Finflow 👻" <mokeke250@gmail.com>',
      to: withdrawalUser.email,
      subject: "Withdrawal Confirmation",
      html: withdrawalConfirmationTemplate
        .replace("{userName}", withdrawalUser.userName)
        .replace("{amount}", amount)
        .replace("{wallet}", wallet)
        .replace("{type}", type)
        .replace("{date}", formattedDate)
        .replace("{userName}", withdrawalUser.userName)
        .replace("{transactionId}", result._id)
        .replace("{balance}", withdrawalUser.accountBalance)
        .replace("{adminNote}", adminNote),
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put(
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

router.get("/withdrawal", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const data = await Withdrawal.find({ user: userId });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch withdrawals" });
  }
});

router.get("/total-withdrawal", authenticateToken, async (req, res) => {
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

//ADMIN ROUTES ************** ADMIN ROUTES ******** ADMIN ROUTES ************** ADMIN ROUTES ******** ADMIN ROUTES

router.get(
  "/admin/get-email-withdrawal",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const template = await WithdrawTemplate.findOne({});
      res.json({ withdrawalConfirmationTemplate: template?.withdrawContent });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while retrieving the email template",
      });
    }
  }
);

router.put(
  "/admin/update-email-withdrawal",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { updatedWithdrawalConfirmationTemplate } = req.body;
      const template = await WithdrawTemplate.findOne({});
      if (template) {
        template.withdrawContent = updatedWithdrawalConfirmationTemplate;
        await template.save();
      } else {
        await WithdrawTemplate.create({
          withdrawContent: updatedWithdrawalConfirmationTemplate,
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

// API endpoint to handle updating the email template

router.get(
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

router.patch(
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

module.exports = router;
