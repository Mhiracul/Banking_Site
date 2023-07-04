const mongoose = require("mongoose");

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
module.exports = Withdrawal;
