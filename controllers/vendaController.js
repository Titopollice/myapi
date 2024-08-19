// controllers/vendaController.js
const db = require("../db");

exports.getAllVendas = (req, res) => {
  db.query("SELECT * FROM venda", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getVendaById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM venda WHERE vendaID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.createVenda = (req, res) => {
  const { dataVenda, totalVenda, Cliente_clienteID, usuario_usuarioID } =
    req.body;
  db.query(
    "INSERT INTO venda (dataVenda, totalVenda, Cliente_clienteID, usuario_usuarioID) VALUES (?, ?, ?, ?)",
    [dataVenda, totalVenda, Cliente_clienteID, usuario_usuarioID],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateVenda = (req, res) => {
  const { id } = req.params;
  const { dataVenda, totalVenda, Cliente_clienteID, usuario_usuarioID } =
    req.body;
  db.query(
    "UPDATE venda SET dataVenda = ?, totalVenda = ?, Cliente_clienteID = ?, usuario_usuarioID = ? WHERE vendaID = ?",
    [dataVenda, totalVenda, Cliente_clienteID, usuario_usuarioID, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Venda updated successfully" });
    }
  );
};

exports.deleteVenda = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM venda WHERE vendaID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Venda deleted successfully" });
  });
};
