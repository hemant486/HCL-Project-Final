const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");
const auth = require("../middleware/auth");

// Get all goals for user
router.get("/", auth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create goal
router.post("/", auth, async (req, res) => {
  try {
    const goal = new Goal({
      ...req.body,
      userId: req.user.userId,
    });
    await goal.save();
    res.status(201).json({ message: "Goal created", goal });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update goal
router.patch("/:id", auth, async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    res.json({ message: "Goal updated", goal });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete goal
router.delete("/:id", auth, async (req, res) => {
  try {
    await Goal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    res.json({ message: "Goal deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
