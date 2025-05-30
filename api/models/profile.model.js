const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: true,
    default: "CyberHero in training!",
  },
  // contentfulID for avatar
  avatarID: {
    type: String,
  },
  petID: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
