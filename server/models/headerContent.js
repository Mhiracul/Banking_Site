const mongoose = require("mongoose");

const headerContentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});
const HeaderContent = mongoose.model("HeaderContent", headerContentSchema);

module.exports = HeaderContent;
