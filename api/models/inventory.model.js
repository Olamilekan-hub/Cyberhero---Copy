const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  inventory: {
    type: [String],
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("Inventories", inventorySchema);
