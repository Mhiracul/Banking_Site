const mongoose = require("mongoose");

const withdrawTemplateSchema = new mongoose.Schema({
  withdrawContent: {
    type: String,
    required: true,
  },
});

const WithdrawTemplate = mongoose.model(
  "WithdrawTemplate",
  withdrawTemplateSchema
);
module.exports = WithdrawTemplate;
