const express = require("express");
const router = express.Router();
const Cliente = require("../models/clienteModel");

// Rota para obter todos os clientes
router.get("/", (req, res) => {
  Cliente.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Rota para obter um cliente específico pelo ID
router.get("/:id", (req, res) => {
  Cliente.getById(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(result);
  });
});

router.get("/nome/:nome", (req, res) => {
  Cliente.getByName(req.params.nome, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
    } else {
      res.json(result);
    }
  });
});

// Rota para criar um novo cliente
router.post("/", (req, res) => {
  Cliente.create(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId });
  });
});

// Rota para atualizar um cliente existente
router.put("/:id", (req, res) => {
  Cliente.update(req.params.id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json({ affectedRows: result.affectedRows });
  });
});

// Rota para alternar o status de um cliente (ativo/inativo)
router.patch("/:id", (req, res) => {
  Cliente.delete(req.params.id, (err, result) => { // O método delete no modelo altera o status
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json({ affectedRows: result.affectedRows });
  });
});

module.exports = router;
