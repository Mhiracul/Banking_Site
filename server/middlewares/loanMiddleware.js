const express = require("express");
const Loan = require("../models/loan");
const Transaction = require("../models/transaction");
const userModel = require("../models/user");
const LoanTemplate = require("../models/loanTemplate");
const nodemailer = require("nodemailer");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/loans", authenticateToken, async (req, res) => {
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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mokeke250@gmail.com",
        pass: "lxvycnellvurscyl",
      },
    });
    const loanUser = await userModel.findById(userId);

    const template = await LoanTemplate.findOne({});
    const loanConfirmationTemplate = template?.loanContent || "";
    const formattedDate = savedLoan.date;

    const mailOptions = {
      from: '"Finflow 👻" <mokeke250@gmail.com>',
      to: loanUser.email,
      subject: "Loan Confirmation",
      html: loanConfirmationTemplate
        .replace("{userName}", loanUser.userName)
        .replace("{amount}", amount)
        .replace("{installments}", installments)
        .replace("{date}", formattedDate)
        .replace("{userName}", loanUser.userName)
        .replace("{transactionId}", savedLoan._id)
        .replace("{balance}", loanUser.accountBalance),
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Loan payment recorded successfully" });
  } catch (error) {
    console.error("Error saving loan payment:", error);
    res.status(500).json({ error: "Failed to record loan payment" });
  }
});

router.get("/loans", authenticateToken, async (req, res) => {
  const userName = req.user.userName;

  try {
    const loans = await Loan.find({ user: userName });
    res.status(200).json(loans);
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).json({ error: "Failed to fetch loans" });
  }
});

//ADMIN ROUTES ************** ADMIN ROUTES ******** ADMIN ROUTES ************** ADMIN ROUTES ******** ADMIN ROUTES

router.get(
  "/admin/get-email-loan",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const template = await LoanTemplate.findOne({});
      res.json({ loanConfirmationTemplate: template?.loanContent });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while retrieving the email template",
      });
    }
  }
);

router.put(
  "/admin/update-email-loan",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { updatedLoanConfirmationTemplate } = req.body;
      const template = await LoanTemplate.findOne({});
      if (template) {
        template.loanContent = updatedLoanConfirmationTemplate;
        await template.save();
      } else {
        await LoanTemplate.create({
          loanContent: updatedLoanConfirmationTemplate,
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

module.exports = router;
