const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// Update profile
router.patch("/profile", auth, async (req, res) => {
  try {
    const { name, email, phone, address, dateOfBirth, gender } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, email, phone, address, dateOfBirth, gender },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
