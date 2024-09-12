const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // This is necessary to parse JSON body requests

const db = new sqlite3.Database(
  './database.db',
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to the database.');
  }
);

app.post('/api/refeicoes', (req, res) => {
  const {usuario_id, data, refeicao} = req.body;
  if (!usuario_id || !data || !refeicao) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  const sql =
    'INSERT INTO refeicoes (usuario_id, data, refeicao) VALUES (?, ?, ?)';
  db.run(sql, [usuario_id, data, refeicao], function (err) {
    if (err) {
      return res.status(500).json({error: err.message});
    }
    res.json({message: 'Refeição agendada com sucesso', id: this.lastID});
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
