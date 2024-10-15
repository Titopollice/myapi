const express = require('express');
const router = express.Router();
const GeradorRelatorio = require('../models/geradorRelatorioModel');

// Rota para gerar o relatório de estoque com base nos filtros fornecidos
router.get('/gerarRelatorio', (req, res) => {
  const { startDate, endDate, supplier, product } = req.query;

  // Verifica se os campos obrigatórios estão presentes
  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Os campos 'startDate' e 'endDate' são obrigatórios." });
  }

  // Chama o método do modelo para gerar o relatório
  GeradorRelatorio.gerarRelatorio({ startDate, endDate, supplier, product }, (err, results) => {
    if (err) {
      console.error('Erro ao gerar o relatório:', err);
      return res.status(500).json({ error: 'Erro ao gerar o relatório' });
    }
    
    // Retorna o relatório gerado
    res.status(200).json(results);
  });
});

module.exports = router;
