const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "devopsdb",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
});

// Health check
app.get("/health", async (req, res) => {
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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});