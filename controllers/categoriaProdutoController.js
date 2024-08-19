// controllers/categoriaprodutoController.js
const db = require("../db");

exports.getAllCategorias = (req, res) => {
  db.query("SELECT * FROM categoriaproduto", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getCategoriaById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM categoriaproduto WHERE idcategoriaProduto = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
};

exports.createCategoria = (req, res) => {
  const { categoria } = req.body;
  db.query(
    "INSERT INTO categoriaproduto (categoria) VALUES (?)",
    [categoria],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateCategoria = (req, res) => {
  const { id } = req.params;
  const { categoria } = req.body;
  db.query(
    "UPDATE categoriaproduto SET categoria = ? WHERE idcategoriaProduto = ?",
    [categoria, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Categoria updated successfully" });
    }
  );
};

exports.deleteCategoria = (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM categoriaproduto WHERE idcategoriaProduto = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Categoria deleted successfully" });
    }
  );
};
