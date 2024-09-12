const express = require("express");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
const SALT_ROUNDS = 10;

// Connect to SQLite Database
const db = new sqlite3.Database("./db/database.sqlite");

// Register route
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  // Check if the username already exists
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to check username" });
    }

    if (row) {
      // Username already exists
      return res.status(400).json({ error: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log(hashedPassword);

    // Insert the new user into the database
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to register user" });
      }
      console.log("User registered successfully");
      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

module.exports = router;
