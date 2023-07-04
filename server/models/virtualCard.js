const mongoose = require("mongoose");

const virtualCardSchema = new mongoose.Schema({
  cardType: String,
  name: String,
});

const VirtualCard = mongoose.model("VirtualCard", virtualCardSchema);

module.exports = VirtualCard;
