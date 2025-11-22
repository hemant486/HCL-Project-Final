const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  targetValue: String,
  currentValue: String,
  unit: String,
  deadline: Date,
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active",
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Goal", goalSchema);
