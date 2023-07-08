const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
  },
  newsletterContent: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: function () {
      return this.option === "specificUser";
    },
  },

  sentTo: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

module.exports = Newsletter;
