const express = require("express");
const router = express.Router();
const Deposit = require("../models/deposit");
const Loan = require("../models/loan");
const Withdrawal = require("../models/withdrawal");
const Savings = require("../models/savings");
const Transaction = require("../models/transaction");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

// Get all transactions for a user
router.get("/transactions", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const transactions = await Transaction.find({ user: userId }).exec();

    const formattedTransactions = transactions.map((transaction) => ({
      type: transaction.type,
      date: transaction.date.toISOString().split("T")[0],
      amount: transaction.amount,
      status: transaction.status,
      user: transaction.user,
    }));

    res.json(formattedTransactions);
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    res.status(500).json({ error: "Failed to retrieve transaction history" });
  }
});

// Get all transactions for admin
router.get(
  "/admin/transaction",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      console.log("Fetching transactions...");

      const transactions = await Transaction.find().populate(
        "user",
        "userName"
      );
      console.log("Transactions:", transactions);

      res.status(200).json({ transactions });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: error.message }); // Log the specific error message
    }
  }
);

// Update the status of a transaction by admin

router.patch(
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

// Get the count of pending transactions for admin
router.get(
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

// Get all transactions for admin

module.exports = router;
