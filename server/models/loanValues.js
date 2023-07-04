const mongoose = require("mongoose");

const dynamicValuesSchema = new mongoose.Schema({
  message: String,
  reasons: [String],
});

const DynamicValues = mongoose.model("DynamicValues", dynamicValuesSchema);

module.exports = DynamicValues;
