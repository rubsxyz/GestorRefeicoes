const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const tasksRouter = require("./routes/tasks");
const loginRouter = require("./routes/login"); // Import the login route
const registerRouter = require("./routes/register");

app.use("/api/tasks", tasksRouter);
app.use("/api/login", loginRouter); // Use the login route
app.use("/api/register", registerRouter);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
