const express = require("express");
const router = express.Router();
const Receber = require("../models/receberModel");

// Rota para obter todas as contas
router.get("/", (req, res) => {
  Receber.getAll((err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar contas: " + err.message });
    res.json(results);
  });
});

// Rota para obter uma conta específica por ID
router.get("/:id", (req, res) => {
  Receber.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar conta: " + err.message });
    if (!result || result.length === 0) return res.status(404).json({ error: "Conta não encontrada" });
    res.json(result[0]); // Retorna um único objeto
  });
});

// Rota para criar uma nova conta
router.post("/", (req, res) => {
  const { descricao, valor, parcelas, datacriacao, status, dataVencimento } = req.body;

  // Validação de dados obrigatórios
  if (!descricao || !valor || !dataVencimento) {
    return res.status(400).json({ error: "Descrição, valor e data de vencimento são obrigatórios" });
  }

  // Validação de parcelas
  if (parcelas && (!Array.isArray(parcelas) || parcelas.length === 0)) {
    return res.status(400).json({ error: "Parcelas devem ser um array e conter pelo menos uma parcela" });
  }

  // Dados para criação da conta
  const novaConta = {
    descricao,
    valor,
    datacriacao: datacriacao || new Date(), // Define a data de criação para hoje, caso não seja fornecida
    status: status || "Pendente", // Define o status como "Pendente", caso não seja fornecido
    dataVencimento, // Data de vencimento é obrigatória
    parcelas, // Inclui as parcelas
  };

  Receber.create(novaConta, (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao criar conta: " + err.message });
    res.status(201).json({ id: result.insertId });
  });
});

// Rota para atualizar uma conta existente por ID
router.put("/:id", (req, res) => {
  const { descricao, valor, parcelas, status, dataVencimento } = req.body;

  // Validação de dados obrigatórios
  if (!descricao || !valor || !dataVencimento) {
    return res.status(400).json({ error: "Descrição, valor e data de vencimento são obrigatórios" });
  }

  // Validação de parcelas
  if (parcelas && (!Array.isArray(parcelas) || parcelas.length === 0)) {
    return res.status(400).json({ error: "Parcelas devem ser um array e conter pelo menos uma parcela" });
  }

  const contaAtualizada = {
    descricao,
    valor,
    status: status || "Pendente", // Mantém "Pendente" caso o status não seja fornecido
    dataVencimento, // Atualiza a data de vencimento
    parcelas, // Atualiza as parcelas
  };

  Receber.update(req.params.id, contaAtualizada, (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao atualizar conta: " + err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Conta não encontrada" });
    res.json({ affectedRows: result.affectedRows });
  });
});

// Rota para excluir uma conta por ID
router.delete("/:id", (req, res) => {
  Receber.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: "Erro ao excluir conta: " + err.message });
    res.status(204).end(); // Sem conteúdo após exclusão bem-sucedida
  });
});

// Rota para atualizar o status de uma parcela específica
router.patch("/parcelas/:parcelaID/status", (req, res) => {
  const parcelaID = req.params.parcelaID;
  const { status, data_baixa } = req.body;

  // Validação dos dados
  if (!status) {
    return res.status(400).json({ error: "O status da parcela é obrigatório" });
  }

  Receber.updateParcelaStatus(parcelaID, status, data_baixa, (err) => {
    if (err) return res.status(500).json({ error: "Erro ao atualizar status da parcela: " + err.message });
    res.status(204).end(); // Sem conteúdo após atualização bem-sucedida
  });
});

  router.get('/:id/parcelas', (req, res) => {
  const contaId = req.params.id;

  // Verifica se a conta existe antes de buscar as parcelas
  Receber.getById(contaId, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar conta: ' + err.message });
    if (!result || result.length === 0) return res.status(404).json({ error: 'Conta não encontrada' });

    // Se a conta existir, busca as parcelas
    Receber.getParcelas(contaId, (err, parcelas) => {
      if (err) return res.status(500).json({ error: 'Erro ao recuperar parcelas' });
      res.json(parcelas);
    });
  });
});

module.exports = router;
