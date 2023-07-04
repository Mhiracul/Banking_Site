const mongoose = require("mongoose");

const emailTemplateSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const EmailTemplate = mongoose.model("EmailTemplate", emailTemplateSchema);

module.exports = EmailTemplate;
