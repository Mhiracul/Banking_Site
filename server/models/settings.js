const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  interestRate: {
    type: Number,
    default: 5,
  },
  minimumLoanAmount: {
    type: Number,
  },
});
const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
