const express = require("express");
const router = express.Router();
const Fornecedor = require("../models/fornecedorModel"); // Certifique-se de que o caminho e o nome estão corretos

router.get("/", (req, res) => {
  Fornecedor.getAll((err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

router.get("/:id", (req, res) => {
  Fornecedor.getById(req.params.id, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(result);
  });
});

router.get("/nome/:nome", (req, res) => {
  Fornecedor.getByName(req.params.nome, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: "Fornecedor não encontrado" });
    } else {
      res.json(result);
    }
  });
});

router.post("/", (req, res) => {
  Fornecedor.create(req.body, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  Fornecedor.update(req.params.id, req.body, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ affectedRows: result.affectedRows });
  });
});

router.patch("/:id", (req, res) => {
  Fornecedor.delete(req.params.id, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ affectedRows: result.affectedRows });
  });
});

module.exports = router;
