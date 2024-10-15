const GeradorRelatorio = require('../models/geradorRelatorioModel'); // Importa o modelo

const gerarRelatorio = (req, res) => {
  const { startDate, endDate, supplier, product } = req.query;

  // Valida se as datas estão presentes
  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'As datas de início e fim são obrigatórias.' });
  }

  // Prepara os filtros para serem passados ao modelo
  const filters = {
    startDate,
    endDate,
    supplier: supplier || null, // Se não houver fornecedor, usa null
    product: product || null    // Se não houver produto, usa null
  };

  // Chama o modelo para gerar o relatório com os filtros aplicados
  GeradorRelatorio.gerar(filters, (err, result) => {
    if (err) {
      console.error('Erro ao gerar relatório:', err);
      return res.status(500).json({ message: 'Erro ao gerar relatório.' });
    }

    // Retorna o resultado do relatório
    res.status(200).json(result);
  });
};

module.exports = {
  gerarRelatorio
};
