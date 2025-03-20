require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Enables JSON parsing

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => console.error("❌ Database connection error:", err));

pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
  process.exit(-1);
});

app.get("/data/:table", async (req, res) => {
    const { table } = req.params;
  
    // Prevent SQL injection by ensuring only valid table names are allowed
    const validTables = ["planet", "asteroids", "galaxy", "moon", "star"];
    if (!validTables.includes(table)) {
      return res.status(400).json({ error: "Invalid table name" });
    }
  
    // Adjust the query for planets to order by distance from the Sun
    const query =
      table === "planet"
        ? "SELECT * FROM planet ORDER BY distance_from_sun_in_millions_km ASC"
        : `SELECT * FROM ${table}`;
  
    try {
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (err) {
      console.error("❌ Query error:", err);
      res.status(500).json({ error: `Error retrieving data for table ${table}` });
    }
  });
  

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
