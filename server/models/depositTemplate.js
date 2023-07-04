const mongoose = require("mongoose");

const depositTemplateSchema = new mongoose.Schema({
  depositContent: {
    type: String,
    required: true,
  },
});

const DepositTemplate = mongoose.model(
  "DepositTemplate",
  depositTemplateSchema
);

module.exports = DepositTemplate;
