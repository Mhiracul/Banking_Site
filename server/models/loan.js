const mongoose = require("mongoose");

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

module.exports = Loan;
