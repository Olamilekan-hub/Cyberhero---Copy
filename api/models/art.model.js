const mongoose = require("mongoose");

const artSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    required: true,
    default: false,
  },
  favorites: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Art", artSchema);
