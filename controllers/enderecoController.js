// controllers/enderecoController.js
const db = require("../db");

exports.getAllEnderecos = (req, res) => {
  db.query("SELECT * FROM endereco", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getEnderecoById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM endereco WHERE idEndereco = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
};

exports.createEndereco = (req, res) => {
  const { tipoEndereco, rua, complemento, cidade, estado } = req.body;
  db.query(
    "INSERT INTO endereco (tipoEndereco, rua, complemento, cidade, estado) VALUES (?, ?, ?, ?, ?)",
    [tipoEndereco, rua, complemento, cidade, estado],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateEndereco = (req, res) => {
  const { id } = req.params;
  const { tipoEndereco, rua, complemento, cidade, estado } = req.body;
  db.query(
    "UPDATE endereco SET tipoEndereco = ?, rua = ?, complemento = ?, cidade = ?, estado = ? WHERE idEndereco = ?",
    [tipoEndereco, rua, complemento, cidade, estado, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Endereco updated successfully" });
    }
  );
};

exports.deleteEndereco = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM endereco WHERE idEndereco = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Endereco deleted successfully" });
  });
};
