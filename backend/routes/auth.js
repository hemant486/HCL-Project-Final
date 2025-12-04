const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { validateRegistration, validateLogin } = require("../utils/validation");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input data
    const validation = validateRegistration({ name, email, password });
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.errors.join(", ") });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input data
    const validation = validateLogin({ email, password });
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.errors.join(", ") });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all patients (for doctors)
router.get("/patients", auth, async (req, res) => {
  try {
    if (req.user.role !== "doctor" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const patients = await User.find({ role: "patient" }).select("-password");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all doctors (for patients)
router.get("/doctors", auth, async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select(
      "name email _id specialization experience consultationFee availability"
    );
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get doctor availability for a specific date
router.get("/doctors/:id/availability", auth, async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id).select("availability");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const dayOfWeek = new Date(date)
      .toLocaleDateString("en-US", {
        weekday: "long",
      })
      .toLowerCase();

    // Get doctor's available slots for that day
    // Handle both Map and plain object
    let availableSlots = [];
    if (doctor.availability instanceof Map) {
      availableSlots = doctor.availability.get(dayOfWeek) || [];
    } else if (doctor.availability && typeof doctor.availability === "object") {
      availableSlots = doctor.availability[dayOfWeek] || [];
    }

    // Get booked appointments for that date
    const Appointment = require("../models/Appointment");
    const bookedAppointments = await Appointment.find({
      doctorId: req.params.id,
      date: new Date(date),
      status: { $in: ["pending", "confirmed"] },
    }).select("time");

    const bookedTimes = bookedAppointments.map((apt) => apt.time);

    // Filter out booked slots
    const availableTimes = availableSlots.filter(
      (slot) => !bookedTimes.includes(slot)
    );

    res.json({
      date,
      dayOfWeek,
      availableSlots: availableTimes,
      bookedSlots: bookedTimes,
      totalSlots: availableSlots.length,
    });
  } catch (error) {
    console.error("Availability error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
