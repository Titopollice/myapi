// controllers/produtoController.js
const db = require("../db");

exports.getAllProdutos = (req, res) => {
  db.query("SELECT * FROM produto", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getProdutoById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM produto WHERE produtoID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.createProduto = (req, res) => {
  const { nomeProduto, dataValidade, categoriaProduto_idcategoriaProduto } =
    req.body;
  db.query(
    "INSERT INTO produto (nomeProduto, dataValidade, categoriaProduto_idcategoriaProduto) VALUES (?, ?, ?)",
    [nomeProduto, dataValidade, categoriaProduto_idcategoriaProduto],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateProduto = (req, res) => {
  const { id } = req.params;
  const { nomeProduto, dataValidade, categoriaProduto_idcategoriaProduto } =
    req.body;
  db.query(
    "UPDATE produto SET nomeProduto = ?, dataValidade = ?, categoriaProduto_idcategoriaProduto = ? WHERE produtoID = ?",
    [nomeProduto, dataValidade, categoriaProduto_idcategoriaProduto, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Produto updated successfully" });
    }
  );
};

exports.deleteProduto = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM produto WHERE produtoID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Produto deleted successfully" });
  });
};
