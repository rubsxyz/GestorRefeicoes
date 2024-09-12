const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET_KEY = "your_jwt_secret_key"; // Replace with your secure secret key

// Connect to SQLite Database
const db = new sqlite3.Database("./db/database.sqlite");

// Create tasks table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    status TEXT,
    date TEXT,
    user_id INTEGER
  )
`);

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(authHeader, token);

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Store the decoded user information (including user_id) in req.user
    next();
  });
}

// Get all tasks for the authenticated user (protected route)
router.get("/", authenticateToken, (req, res) => {
  const userId = req.user.userId; // Assume the token contains the user's ID as `id`
  db.all("SELECT * FROM tasks WHERE user_id = ?", [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ tasks: rows });
  });
});

// Get task by task ID for the authenticated user (protected route)
router.get("/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId; // Get the user ID from the token

  db.get("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [id, userId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      return res.status(404).json({ message: "Task not found or you don't have access to it" });
    }
    res.json({ task: row });
  });
});

// Create a new task for the authenticated user (protected route)
router.post("/", authenticateToken, (req, res) => {
  const { title, description, status, date } = req.body;
  const userId = req.user.userId; // Get the user ID from the token

  const sql = "INSERT INTO tasks (title, description, status, date, user_id) VALUES (?, ?, ?, ?, ?)";
  db.run(sql, [title, description, status, date, userId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Update a task for the authenticated user (protected route)
router.put("/:id", authenticateToken, (req, res) => {
  const { title, description, status, date } = req.body;
  const { id } = req.params;
  const userId = req.user.userId; // Get the user ID from the token

  const sql = "UPDATE tasks SET title = ?, description = ?, status = ?, date = ? WHERE id = ? AND user_id = ?";
  db.run(sql, [title, description, status, date, id, userId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Task not found or you don't have access to it" });
    }
    res.status(200).json({ changes: this.changes });
  });
});

// Delete task for the authenticated user (protected route)
router.delete("/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId; // Get the user ID from the token

  db.run("DELETE FROM tasks WHERE id = ? AND user_id = ?", [id, userId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Task not found or you don't have access to it" });
    }
    res.json({ message: `Task with ID ${id} deleted successfully.` });
  });
});

module.exports = router;
