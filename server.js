const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

const db = new sqlite3.Database("database.db");

// Rota para inserir uma nova refeição (POST)
app.post("/api/refeicoes", (req, res) => {
    const { usuario_id, data, refeicao } = req.body;

    if (!usuario_id || !data || !refeicao) {
        return res
            .status(400)
            .json({ error: "Todos os campos são obrigatórios" });
    }

    const query = `INSERT INTO refeicoes (usuario_id, data, refeicao) VALUES (?, ?, ?)`;
    const params = [usuario_id, data, refeicao];

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: "Refeição inserida com sucesso",
            id: this.lastID,
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
