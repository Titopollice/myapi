const express = require('express');
const router = express.Router();
const { 
  GeradorRelatorio, 
  GeradorRelatorioContasReceber, 
  GeradorRelatorioContasPagar, 
  GeradorRelatorioVenda 
} = require('../models/geradorRelatorioModel');

// Função para validar datas
const isValidDate = (dateString) => {
  return !isNaN(Date.parse(dateString));
};

// Middleware para validação de data
const validateDates = (req, res, next) => {
  const { startDate, endDate } = req.query;

  // Verifica se as datas estão presentes
  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Os campos 'startDate' e 'endDate' são obrigatórios." });
  }

  // Verifica se as datas fornecidas são válidas
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res.status(400).json({ error: 'Datas inválidas fornecidas.' });
  }

  // Segue para a próxima função se tudo estiver correto
  next();
};

// Rota para gerar o relatório de estoque com base nos filtros fornecidos
router.get('/gerarRelatorio', validateDates, (req, res) => {
  const { startDate, endDate, supplier, product } = req.query;

  GeradorRelatorio.gerarRelatorio({ startDate, endDate, supplier, product }, (err, results) => {
    if (err) {
      console.error('Erro ao gerar o relatório:', err);
      return res.status(500).json({ error: 'Erro ao gerar o relatório' });
    }
    
    res.status(200).json(results);
  });
});

// Rota para gerar o relatório de contas a receber
router.get('/gerarRelatorioReceber', validateDates, (req, res) => {
  const { startDate, endDate, status } = req.query;

  GeradorRelatorioContasReceber.gerarRelatorio({ startDate, endDate, status }, (err, results) => {
    if (err) {
      console.error('Erro ao gerar o relatório de contas a receber:', err);
      return res.status(500).json({ error: 'Erro ao gerar o relatório.', details: err.message });
    }
    
    res.status(200).json(results);
  });
});

// Rota para gerar o relatório de contas a pagar
router.get('/gerarRelatorioPagar', validateDates, (req, res) => {
  const { startDate, endDate, status } = req.query;

  GeradorRelatorioContasPagar.gerarRelatorio({ startDate, endDate, status }, (err, results) => {
    if (err) {
      console.error('Erro ao gerar o relatório de contas a pagar:', err);
      return res.status(500).json({ error: 'Erro ao gerar o relatório.', details: err.message });
    }
    
    res.status(200).json(results);
  });
});


// Rota para gerar o relatório de vendas com base nos filtros de usuário e data
router.get('/gerarRelatorioVenda', validateDates, (req, res) => {
  const { startDate, endDate, employeeId } = req.query;

  GeradorRelatorioVenda.getReport({ startDate, endDate, employeeId }, (err, results) => {
    if (err) {
      console.error('Erro ao gerar o relatório de vendas:', err);
      return res.status(500).json({ error: 'Erro ao gerar o relatório de vendas.', details: err.message });
    }
    
    res.status(200).json(results);
  });
});

module.exports = router;
