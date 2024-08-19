// controllers/clienteController.js
const db = require("../db");

exports.getAllClientes = (req, res) => {
  db.query("SELECT * FROM cliente", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getClienteById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM cliente WHERE clienteID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.createCliente = (req, res) => {
  const { nome, cpf, idInformacoesPessoais, idEndereco } = req.body;
  db.query(
    "INSERT INTO cliente (nome, cpf, idInformacoesPessoais, idEndereco) VALUES (?, ?, ?, ?)",
    [nome, cpf, idInformacoesPessoais, idEndereco],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateCliente = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, idInformacoesPessoais, idEndereco } = req.body;
  db.query(
    "UPDATE cliente SET nome = ?, cpf = ?, idInformacoesPessoais = ?, idEndereco = ? WHERE clienteID = ?",
    [nome, cpf, idInformacoesPessoais, idEndereco, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Cliente updated successfully" });
    }
  );
};

exports.deleteCliente = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM cliente WHERE clienteID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cliente deleted successfully" });
  });
};
