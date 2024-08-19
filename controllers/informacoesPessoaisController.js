// controllers/informacoesPessoaisController.js
const db = require("../db");

exports.getAllInformacoesPessoais = (req, res) => {
  db.query("SELECT * FROM informacoes_pessoais", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getInformacaoPessoalById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM informacoes_pessoais WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
};

exports.createInformacaoPessoal = (req, res) => {
  const { data_nascimento, genero } = req.body;
  db.query(
    "INSERT INTO informacoes_pessoais (data_nascimento, genero) VALUES (?, ?)",
    [data_nascimento, genero],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateInformacaoPessoal = (req, res) => {
  const { id } = req.params;
  const { data_nascimento, genero } = req.body;
  db.query(
    "UPDATE informacoes_pessoais SET data_nascimento = ?, genero = ? WHERE id = ?",
    [data_nascimento, genero, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Informação Pessoal updated successfully" });
    }
  );
};

exports.deleteInformacaoPessoal = (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM informacoes_pessoais WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Informação Pessoal deleted successfully" });
    }
  );
};
