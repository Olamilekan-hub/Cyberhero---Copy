const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
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
  },
  rank: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
