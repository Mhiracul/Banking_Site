const mongoose = require("mongoose");

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

module.exports = Transaction;
