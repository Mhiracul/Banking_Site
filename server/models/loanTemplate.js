const mongoose = require("mongoose");

const loanTemplateSchema = new mongoose.Schema({
  loanContent: {
    type: String,
    required: true,
  },
});

const LoanTemplate = mongoose.model("LoanTemplate", loanTemplateSchema);
module.exports = LoanTemplate;
