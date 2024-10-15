const db = require("../db");

class GeradorRelatorio {
  static gerarRelatorio({ startDate, endDate, supplier, product }, callback) {
    let query = `
      SELECT e.quantidade, e.DataDaMovimentacao, p.nomeProduto, f.nome 
      FROM estoque e 
      JOIN produto p ON e.Produto_produtoID = p.produtoID 
      JOIN fornecedor f ON e.IdFornecedor = f.fornecedorID
      WHERE e.DataDaMovimentacao BETWEEN ? AND ?`;

    const params = [startDate, endDate];

    // Adicionando o filtro de fornecedor se fornecido
    if (supplier) {
      query += " AND e.IdFornecedor = ?";
      params.push(supplier);
    }

    // Adicionando o filtro de produto se fornecido
    if (product) {
      query += " AND e.Produto_produtoID = ?";
      params.push(product);
    }

    // Executando a query com os parâmetros dinamicamente montados
    db.query(query, params, callback);
  }
}

module.exports = GeradorRelatorio;
