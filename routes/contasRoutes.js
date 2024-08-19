// routes/contas.js
const express = require("express");
const router = express.Router();
const Contas = require("../models/contasModel");

router.get("/", (req, res) => {
  Contas.getAll((err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

router.get("/:id", (req, res) => {
  Contas.getById(req.params.id, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(result);
  });
});

router.post("/", (req, res) => {
  Contas.create(req.body, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  Contas.update(req.params.id, req.body, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ affectedRows: result.affectedRows });
  });
});

router.delete("/:id", (req, res) => {
  Contas.delete(req.params.id, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ affectedRows: result.affectedRows });
  });
});

module.exports = router;
