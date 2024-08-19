// routes/itemvenda.js
const express = require("express");
const router = express.Router();
const ItemVenda = require("../models/itemVendaModel");

router.get("/", (req, res) => {
  ItemVenda.getAll((err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

router.get("/:id", (req, res) => {
  ItemVenda.getById(req.params.id, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(result);
  });
});

router.post("/", (req, res) => {
  ItemVenda.create(req.body, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  ItemVenda.update(req.params.id, req.body, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ affectedRows: result.affectedRows });
  });
});

router.delete("/:id", (req, res) => {
  ItemVenda.delete(req.params.id, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ affectedRows: result.affectedRows });
  });
});

module.exports = router;
