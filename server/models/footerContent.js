const mongoose = require("mongoose");

const footerContentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});
const FooterContent = mongoose.model("FooterContent", footerContentSchema);

module.exports = FooterContent;
