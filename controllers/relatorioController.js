// controllers/relatorioController.js
const db = require("../db");

exports.getAllRelatorios = (req, res) => {
  db.query("SELECT * FROM relatorio", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getRelatorioById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM relatorio WHERE idrelatorio = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
};

exports.createRelatorio = (req, res) => {
  const { tipoRelatorio, dataCriacao, usuario_usuarioID } = req.body;
  db.query(
    "INSERT INTO relatorio (tipoRelatorio, dataCriacao, usuario_usuarioID) VALUES (?, ?, ?)",
    [tipoRelatorio, dataCriacao, usuario_usuarioID],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateRelatorio = (req, res) => {
  const { id } = req.params;
  const { tipoRelatorio, dataCriacao, usuario_usuarioID } = req.body;
  db.query(
    "UPDATE relatorio SET tipoRelatorio = ?, dataCriacao = ?, usuario_usuarioID = ? WHERE idrelatorio = ?",
    [tipoRelatorio, dataCriacao, usuario_usuarioID, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Relatorio updated successfully" });
    }
  );
};

exports.deleteRelatorio = (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM relatorio WHERE idrelatorio = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Relatorio deleted successfully" });
    }
  );
};
