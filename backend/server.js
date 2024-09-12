const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Add more routes here

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
