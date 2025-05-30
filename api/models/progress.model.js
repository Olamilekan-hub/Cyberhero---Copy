const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  missionName: {
    type: String,
    required: true,
  },
  missionType: {
    type: String,
    required: true,
  },
  contentfulID: {
    type: String,
    required: true,
  },
  Training: {
    read: {
      0: { type: Boolean, required: true, default: false },
      1: { type: Boolean, required: true, default: false },
      2: { type: Boolean, required: true, default: false },
      3: { type: Boolean, required: true, default: false },
      4: { type: Boolean, required: true, default: false },
      5: { type: Boolean, required: true, default: false },
    },
    action: {
      0: { type: Boolean, required: true, default: false },
      1: { type: Boolean, required: true, default: false },
      2: { type: Boolean, required: true, default: false },
      3: { type: Boolean, required: true, default: false },
      4: { type: Boolean, required: true, default: false },
      5: { type: Boolean, required: true, default: false },
    },
    create: {
      0: { type: Boolean, required: true, default: false },
      1: { type: Boolean, required: true, default: false },
      2: { type: Boolean, required: true, default: false },
      3: { type: Boolean, required: true, default: false },
      4: { type: Boolean, required: true, default: false },
      5: { type: Boolean, required: true, default: false },
    },
    watch: {
      0: { type: Boolean, required: true, default: false },
      1: { type: Boolean, required: true, default: false },
      2: { type: Boolean, required: true, default: false },
      3: { type: Boolean, required: true, default: false },
      4: { type: Boolean, required: true, default: false },
      5: { type: Boolean, required: true, default: false },
    },
    quiz: {
      0: { type: Boolean, required: true, default: false },
      1: { type: Boolean, required: true, default: false },
      2: { type: Boolean, required: true, default: false },
      3: { type: Boolean, required: true, default: false },
      4: { type: Boolean, required: true, default: false },
      5: { type: Boolean, required: true, default: false },
    },
  },
  Global: {
    read: {
      0: { type: Boolean, required: true, default: false },
      1: { type: Boolean, required: true, default: false },
      2: { type: Boolean, required: true, default: false },
      3: { type: Boolean, required: true, default: false },
      4: { type: Boolean, required: true, default: false },
      5: { type: Boolean, required: true, default: false },
    },
    action: {
      0: { type: Boolean, required: true, default: false },
      1: { type: Boolean, required: true, default: false },
      2: { type: Boolean, required: true, default: false },
      3: { type: Boolean, required: true, default: false },
      4: { type: Boolean, required: true, default: false },
      5: { type: Boolean, required: true, default: false },
    },
    create: {
      0: { type: Boolean, required: true, default: false },
      1: { type: Boolean, required: true, default: false },
      2: { type: Boolean, required: true, default: false },
      3: { type: Boolean, required: true, default: false },
      4: { type: Boolean, required: true, default: false },
      5: { type: Boolean, required: true, default: false },
    },
    watch: {
      0: { type: Boolean, required: true, default: false },
      1: { type: Boolean, required: true, default: false },
      2: { type: Boolean, required: true, default: false },
      3: { type: Boolean, required: true, default: false },
      4: { type: Boolean, required: true, default: false },
      5: { type: Boolean, required: true, default: false },
    },
    quiz: {
      0: { type: Boolean, required: true, default: false },
      1: { type: Boolean, required: true, default: false },
      2: { type: Boolean, required: true, default: false },
      3: { type: Boolean, required: true, default: false },
      4: { type: Boolean, required: true, default: false },
      5: { type: Boolean, required: true, default: false },
    },
  },
  complete: { type: Boolean, required: true, default: false },
  event: { type: Boolean, required: true, default: false },
  quiz: { type: Boolean, required: true, default: false },
  play: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Progress", progressSchema);
