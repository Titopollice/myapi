// routes/contas.js
const express = require("express");
const router = express.Router();
const Contas = require("../models/contasModel");

// Rota para obter todas as contas
router.get("/", (req, res) => {
  Contas.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Rota para obter uma conta específica por ID
router.get("/:id", (req, res) => {
  Contas.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result || result.length === 0) return res.status(404).json({ error: "Conta não encontrada" });
    res.json(result[0]); // Ajuste aqui para retornar o único objeto
  });
});

// Rota para criar uma nova conta
router.post("/", (req, res) => {
  Contas.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId });
  });
});

// Rota para atualizar uma conta existente por ID
router.put("/:id", (req, res) => {
  Contas.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Conta não encontrada" });
    res.json({ affectedRows: result.affectedRows });
  });
});

// Rota para excluir uma conta por ID
router.delete("/:id", (req, res) => {
  Contas.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).end(); // Sem conteúdo para retornar após exclusão
  });
});

// Rota para atualizar o status de uma parcela específica
router.patch("/parcelas/:parcelaID/status", (req, res) => {
  const parcelaID = req.params.parcelaID;
  const { status, data_baixa } = req.body;

  Contas.updateParcelaStatus(parcelaID, status, data_baixa, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).end(); // Sem conteúdo para retornar após atualização
  });
});

module.exports = router;
