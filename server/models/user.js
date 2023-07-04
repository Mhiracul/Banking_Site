const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  accountBalance: {
    type: Number,
    default: 0,
  },
  role: String,
  phoneNumber: String,
  accountNumber: String,
  accountNo: String,
  bitcoinWalletAddress: String,
  tetherWalletAddress: String,
  country: String,
  account: String,
  currency: String,
  image: { type: String },
  status: {
    type: String,
    enum: ["suspended", "activated", "disabled"],
    default: "activated",
  },
  gender: String,
  pendingRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  lastSavingsDate: Date,
  earnings: {
    type: Number,
    default: 0,
  },
  otp: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
