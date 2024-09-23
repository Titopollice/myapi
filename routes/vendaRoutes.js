const express = require("express");
const router = express.Router();
const Venda = require("../models/vendaModel");

// Buscar todas as vendas
router.get("/", (req, res) => {
  Venda.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Buscar venda por ID
router.get("/:id", (req, res) => {
  Venda.getById(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: "Venda não encontrada" });
    } else {
      res.json(result);
    }
  });
});

// Criar nova venda
router.post('/venda', (req, res) => {
  const vendaData = {
    dataVenda: req.body.dataVenda,
    totalVenda: req.body.totalVenda,
    desconto: req.body.desconto,
    usuario_usuarioID: req.body.usuario_usuarioID, // Corrigido aqui
    items: req.body.items.map(item => ({
      produtoID: item.produtoID,
      quantidade: item.quantidade,
      valorproduto: item.valorproduto,
      valortotalproduto: item.valortotalproduto,
      valordescontoproduto: item.valordescontoproduto
    }))
  };

  Venda.create(vendaData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar a venda', details: err });
    }

    res.status(201).json({
      message: 'Venda criada com sucesso!',
      vendaID: result.insertId
    });
  });
});

// Atualizar venda por ID
router.put("/:id", (req, res) => {
  Venda.update(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Venda não encontrada" });
    } else {
      res.json({ message: "Venda atualizada com sucesso", affectedRows: result.affectedRows });
    }
  });
});

// Deletar venda por ID
router.delete("/:id", (req, res) => {
  Venda.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Venda não encontrada" });
    } else {
      res.json({ message: "Venda deletada com sucesso", affectedRows: result.affectedRows });
    }
  });
});

// Buscar produto por código de barras
router.get("/produto/:barcode", (req, res) => {
  Venda.getProductByBarcode(req.params.barcode, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
    } else {
      res.json(result[0]); // Retorna o produto encontrado
    }
  });
});

module.exports = router;
