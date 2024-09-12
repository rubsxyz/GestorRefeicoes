const express = require("express");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");

const router = express.Router();

// Secret key for signing JWTs (you can store this securely in environment variables)
const SECRET_KEY = "your_jwt_secret_key";

// Connect to SQLite Database
const db = new sqlite3.Database("./db/database.sqlite", (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  }
});

// Login route
router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists in the database
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Database error occurred." });
    }

    if (!user) {
      // If the user is not found
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // If the login is successful, create a JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  });
});

module.exports = router;
