// routes/estoque.js
const express = require("express");
const router = express.Router();
const Estoque = require("../models/estoqueModel");

// Rota para obter todos os registros de estoque
router.get("/", async (req, res) => {
  try {
    const results = await Estoque.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para obter um registro de estoque por ID
router.get("/:id", async (req, res) => {
  try {
    const result = await Estoque.getById(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Registro de estoque não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para criar um novo registro de estoque
router.post("/", async (req, res) => {
  const { quantidade, DataDaMovimentacao, Produto_produtoID, IdFornecedor } = req.body;

  if (!quantidade || !DataDaMovimentacao || !Produto_produtoID || !IdFornecedor) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const result = await Estoque.create(req.body);
    if (result && result.insertId) {
      res.status(201).json({ id: result.insertId });
    } else {
      res.status(500).json({ error: "Falha ao inserir no estoque." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para atualizar um registro de estoque
router.put("/:id", async (req, res) => {
  const { quantidade, DataDaMovimentacao, Produto_produtoID, IdFornecedor } = req.body;

  if (!quantidade || !DataDaMovimentacao || !Produto_produtoID || !IdFornecedor) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const exists = await Estoque.getById(req.params.id);
    if (!exists) {
      return res.status(404).json({ error: "Registro de estoque não encontrado." });
    }

    const result = await Estoque.update(req.params.id, req.body);
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para deletar um registro de estoque
router.delete("/:id", async (req, res) => {
  try {
    const exists = await Estoque.getById(req.params.id);
    if (!exists) {
      return res.status(404).json({ error: "Registro de estoque não encontrado." });
    }

    const result = await Estoque.delete(req.params.id);
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
