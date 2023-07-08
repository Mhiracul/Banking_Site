const mongoose = require("mongoose");

const dynamicValuesSchema = new mongoose.Schema({
  reasons: [String],
});

const DynamicValues = mongoose.model("DynamicValues", dynamicValuesSchema);

module.exports = DynamicValues;
