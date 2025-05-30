const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Achievement", achievementSchema);
