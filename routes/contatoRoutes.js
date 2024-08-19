// routes/contato.js
const express = require("express");
const router = express.Router();
const Contato = require("../models/contatoModel");

router.get("/", (req, res) => {
  Contato.getAll((err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

router.get("/:id", (req, res) => {
  Contato.getById(req.params.id, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(result);
  });
});

router.post("/", (req, res) => {
  Contato.create(req.body, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  Contato.update(req.params.id, req.body, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ affectedRows: result.affectedRows });
  });
});

router.delete("/:id", (req, res) => {
  Contato.delete(req.params.id, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ affectedRows: result.affectedRows });
  });
});

module.exports = router;
