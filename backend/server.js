const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

const db = new sqlite3.Database(
  './database.db',
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) console.error(err.message);
    console.log('Connected to the database.');
  }
);

// Handling login
app.post('/api/login', (req, res) => {
  const {email, password} = req.body;
  db.get(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, user) => {
      if (err) {
        res.status(500).json({error: err.message});
        return;
      }
      if (user) {
        req.session.userId = user.id; // Set user session
        res.json({success: true, message: 'Logged in successfully'});
      } else {
        res.status(401).json({success: false, message: 'Invalid credentials'});
      }
    }
  );
});

// Handling registration
app.post('/api/register', (req, res) => {
  const {email, password} = req.body;
  db.run(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password],
    function (err) {
      if (err) {
        res.status(500).json({error: err.message});
        return;
      }
      res.json({
        success: true,
        message: 'User registered successfully',
        userId: this.lastID,
      });
    }
  );
});

// Handling meal booking
app.post('/api/refeicoes', (req, res) => {
  if (!req.session.userId) {
    res.status(403).json({error: 'Not authenticated'});
    return;
  }
  const {usuario_id, data, refeicao} = req.body;
  db.run(
    'INSERT INTO refeicoes (usuario_id, data, refeicao) VALUES (?, ?, ?)',
    [usuario_id, data, refeicao],
    function (err) {
      if (err) {
        res.status(500).json({error: err.message});
        return;
      }
      res.json({message: 'Refeição agendada com sucesso', id: this.lastID});
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
