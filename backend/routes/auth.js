// routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database('./db/database.db');

// Secret para JWT (Para produção, utilize variáveis de ambiente)
const SECRET = 'chave';

// Criar tabela de utilizadores se não existir
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  role TEXT
)`);

// Registar utilizador
router.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run(
    `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
    [username, hashedPassword, role || 'user'],
    function (err) {
      if (err)
        return res.status(400).json({ message: 'Utilizador já existe.' });
      res.json({ message: 'Utilizador registado com sucesso!' });
    }
  );
});

// Login utilizador
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user)
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }
    // Gerar token JWT sem expiração
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET);
    res.json({ token });
  });
});

module.exports = router;
