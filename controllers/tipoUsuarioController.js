// controllers/tipousuarioController.js
const db = require("../db");

exports.getAllTipoUsuarios = (req, res) => {
  db.query("SELECT * FROM tipousuario", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getTipoUsuarioById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM tipousuario WHERE idtipoUsuario = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
};

exports.createTipoUsuario = (req, res) => {
  const { tipo } = req.body;
  db.query(
    "INSERT INTO tipousuario (tipo) VALUES (?)",
    [tipo],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateTipoUsuario = (req, res) => {
  const { id } = req.params;
  const { tipo } = req.body;
  db.query(
    "UPDATE tipousuario SET tipo = ? WHERE idtipoUsuario = ?",
    [tipo, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Tipo Usuario updated successfully" });
    }
  );
};

exports.deleteTipoUsuario = (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM tipousuario WHERE idtipoUsuario = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Tipo Usuario deleted successfully" });
    }
  );
};
