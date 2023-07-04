const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema({
  depositAmount: {
    type: Number,
    required: true,
  },
  selectedMethod: {
    type: String,
    enum: ["crypto", "wire-transfer"],
    required: true,
  },
  selectedCryptoAddress: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: function () {
      return this.selectedMethod !== "crypto";
    },
  },
  bankNumber: {
    type: String,
    required: function () {
      return this.selectedMethod !== "crypto";
    },
  },
  status: {
    type: String,
    enum: ["pending", "success"],
    default: "pending",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
});

const Deposit = mongoose.model("Deposit", depositSchema);

module.exports = Deposit;
