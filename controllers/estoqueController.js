// controllers/estoqueController.js
const db = require("../db");

exports.getAllEstoques = (req, res) => {
  db.query("SELECT * FROM estoque", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getEstoqueById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM estoque WHERE idEstoque = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.createEstoque = (req, res) => {
  const { quantidadeMinina, ultimaMovimentacao, Produto_produtoID } = req.body;
  db.query(
    "INSERT INTO estoque (quantidadeMinina, ultimaMovimentacao, Produto_produtoID) VALUES (?, ?, ?)",
    [quantidadeMinina, ultimaMovimentacao, Produto_produtoID],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateEstoque = (req, res) => {
  const { id } = req.params;
  const { quantidadeMinina, ultimaMovimentacao, Produto_produtoID } = req.body;
  db.query(
    "UPDATE estoque SET quantidadeMinina = ?, ultimaMovimentacao = ?, Produto_produtoID = ? WHERE idEstoque = ?",
    [quantidadeMinina, ultimaMovimentacao, Produto_produtoID, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Estoque updated successfully" });
    }
  );
};

exports.deleteEstoque = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM estoque WHERE idEstoque = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Estoque deleted successfully" });
  });
};
