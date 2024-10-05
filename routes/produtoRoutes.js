// routes/produto.js
const express = require("express");
const router = express.Router();
const Produto = require("../models/produtoModel");

// Buscar todos os produtos
router.get("/", (req, res) => {
  Produto.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Buscar produto por ID
router.get("/:id", (req, res) => {
  Produto.getById(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
    } else {
      res.json(result);
    }
  });
});

// Buscar produto por nome
router.get("/nome/:nomeProduto", (req, res) => {
  Produto.getByName(req.params.nomeProduto, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
    } else {
      res.json(result);
    }
  });
});

// Criar novo produto
router.post("/", (req, res) => {
  Produto.create(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
});

// Atualizar produto por ID
router.put("/:id", (req, res) => {
  Produto.update(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
    } else {
      res.json({ affectedRows: result.affectedRows });
    }
  });
});

// Alterar o status do produto em vez de deletar
router.patch("/:id", (req, res) => {
  Produto.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
    } else {
      res.json({ affectedRows: result.affectedRows });
    }
  });
});

module.exports = router;
