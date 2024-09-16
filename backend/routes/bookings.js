// routes/bookings.js

const express = require('express');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database('./db/database.db');
const SECRET = 'chave';

// Criar tabela de bookings se não existir
db.run(`CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  date TEXT,
  meal TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
)`);

// Middleware de autenticação
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Obter todas as marcações (administradores)
router.get('/', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  db.all(
    `SELECT bookings.*, users.username FROM bookings JOIN users ON bookings.user_id = users.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(rows);
    }
  );
});

// Obter marcações do utilizador
router.get('/me', authenticateToken, (req, res) => {
  db.all(
    `SELECT * FROM bookings WHERE user_id = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(rows);
    }
  );
});

// Adicionar marcação
router.post('/', authenticateToken, (req, res) => {
  const { date, meal } = req.body;
  db.run(
    `INSERT INTO bookings (user_id, date, meal) VALUES (?, ?, ?)`,
    [req.user.id, date, meal],
    function (err) {
      if (err) return res.status(400).json({ message: err.message });
      res.json({ id: this.lastID, date, meal });
    }
  );
});

// Editar marcação
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { date, meal } = req.body;
  db.get(`SELECT * FROM bookings WHERE id = ?`, [id], (err, booking) => {
    if (err || !booking)
      return res.status(404).json({ message: 'Marcação não encontrada.' });
    if (booking.user_id !== req.user.id && req.user.role !== 'admin')
      return res.sendStatus(403);
    db.run(
      `UPDATE bookings SET date = ?, meal = ? WHERE id = ?`,
      [date, meal, id],
      function (err) {
        if (err) return res.status(400).json({ message: err.message });
        res.json({ id, date, meal });
      }
    );
  });
});

// Cancelar marcação
router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM bookings WHERE id = ?`, [id], (err, booking) => {
    if (err || !booking)
      return res.status(404).json({ message: 'Marcação não encontrada.' });
    if (booking.user_id !== req.user.id && req.user.role !== 'admin')
      return res.sendStatus(403);
    db.run(`DELETE FROM bookings WHERE id = ?`, [id], function (err) {
      if (err) return res.status(400).json({ message: err.message });
      res.json({ message: 'Marcação cancelada.' });
    });
  });
});

module.exports = router;
