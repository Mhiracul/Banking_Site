const mongoose = require("mongoose");

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

module.exports = Savings;
