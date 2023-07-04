const mongoose = require("mongoose");

const savingsTemplateSchema = new mongoose.Schema({
  savingsContent: {
    type: String,
    required: true,
  },
});

const SavingsTemplate = mongoose.model(
  "SavingsTemplate",
  savingsTemplateSchema
);

module.exports = SavingsTemplate;
