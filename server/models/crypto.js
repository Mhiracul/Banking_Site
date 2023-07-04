const mongoose = require("mongoose");

const cryptoWalletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  bankName: {
    type: String,
  },
  bankNumber: {
    type: Number,
  },
  active: {
    type: Boolean,
    enum: ["false", "true"],
    default: true,
  },
});

const CryptoWallet = mongoose.model("CryptoWallet", cryptoWalletSchema);

module.exports = CryptoWallet;
