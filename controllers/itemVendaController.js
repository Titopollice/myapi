// controllers/itemvendaController.js
const db = require("../db");

exports.getAllItensVenda = (req, res) => {
  db.query("SELECT * FROM itemvenda", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getItemVendaById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM itemvenda WHERE itemVendaID = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
};

exports.createItemVenda = (req, res) => {
  const { quantidade, venda_vendaID, Produto_produtoID } = req.body;
  db.query(
    "INSERT INTO itemvenda (quantidade, venda_vendaID, Produto_produtoID) VALUES (?, ?, ?)",
    [quantidade, venda_vendaID, Produto_produtoID],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateItemVenda = (req, res) => {
  const { id } = req.params;
  const { quantidade, venda_vendaID, Produto_produtoID } = req.body;
  db.query(
    "UPDATE itemvenda SET quantidade = ?, venda_vendaID = ?, Produto_produtoID = ? WHERE itemVendaID = ?",
    [quantidade, venda_vendaID, Produto_produtoID, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Item Venda updated successfully" });
    }
  );
};

exports.deleteItemVenda = (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM itemvenda WHERE itemVendaID = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Item Venda deleted successfully" });
    }
  );
};
