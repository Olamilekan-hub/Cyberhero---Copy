const mongoose = require("mongoose");

const favArtSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  favorites: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("FavoriteArts", favArtSchema);
