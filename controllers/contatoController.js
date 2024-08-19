// controllers/contatoController.js
const db = require("../db");

exports.getAllContatos = (req, res) => {
  db.query("SELECT * FROM contato", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getContatoById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM contato WHERE idContato = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.createContato = (req, res) => {
  const { Cliente_clienteID, email, telefone } = req.body;
  db.query(
    "INSERT INTO contato (Cliente_clienteID, email, telefone) VALUES (?, ?, ?)",
    [Cliente_clienteID, email, telefone],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateContato = (req, res) => {
  const { id } = req.params;
  const { Cliente_clienteID, email, telefone } = req.body;
  db.query(
    "UPDATE contato SET Cliente_clienteID = ?, email = ?, telefone = ? WHERE idContato = ?",
    [Cliente_clienteID, email, telefone, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Contato updated successfully" });
    }
  );
};

exports.deleteContato = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM contato WHERE idContato = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Contato deleted successfully" });
  });
};
