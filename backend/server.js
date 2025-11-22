require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://hcl-project-final-git-main-hemants-projects-4545bdbc.vercel.app",
];

// Add FRONTEND_URL if it exists
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

// CORS configuration for Vercel
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Allow all Vercel URLs and localhost
  if (
    !origin ||
    origin.includes("vercel.app") ||
    origin.includes("localhost") ||
    allowedOrigins.includes(origin)
  ) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/health", require("./routes/health"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/records", require("./routes/records"));
app.use("/api/goals", require("./routes/goals"));

app.get("/", (req, res) => {
  res.json({ message: "Healthcare Portal API" });
});

// Error handling middleware
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");

app.use(logger);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Export for Vercel serverless
module.exports = app;

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}`);
  });
}
