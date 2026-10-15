

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const rateLimit = require("express-rate-limit");

const app = express();

// Rate limiter for API routes: 100 requests per IP per minute
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for health check: 120 requests per IP per minute
const healthLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(express.json());
app.use("/api", apiLimiter);

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "devopsdb",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
});

// Health check
app.get("/health", healthLimiter, async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "healthy",
      database: "connected",
    });
  } catch (error) {
    console.error("Database error:", error.message);

    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
    });
  }
});

// Test API
app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello from Node.js backend!",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
