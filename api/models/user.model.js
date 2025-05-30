const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  verified: { type: Boolean, default: false },
  token: {
    type: String,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  isSubscribed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
