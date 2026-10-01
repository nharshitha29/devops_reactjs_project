const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "devopsdb",
  user: "postgres",
  password: "Neeli@21##",
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