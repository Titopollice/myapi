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
    db.query(query, params, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
}

class GeradorRelatorioContasReceber {
  static gerarRelatorio({ startDate, endDate, status }, callback) {
    let query = `
      SELECT cp.descricao, cp.valor, cp.datacriacao, cp.vencimento, cp.status 
      FROM parcelas_receber cp
      WHERE cp.datacriacao BETWEEN ? AND ?`;
  
    const params = [startDate, endDate];
  
    // Adicionando o filtro de status se fornecido
    if (status) {
      query += " AND cp.status = ?";
      params.push(status);
    }
  
    // Executando a query com os parâmetros dinamicamente montados
    db.query(query, params, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  
}

class GeradorRelatorioContasPagar {
  static gerarRelatorio({ startDate, endDate, status }, callback) {
    let query = `
      SELECT cp.descricao, cp.valor, cp.datacriacao, cp.vencimento, cp.status 
      FROM parcelas_pagar cp
      WHERE cp.datacriacao BETWEEN ? AND ?`;
  
    const params = [startDate, endDate];
  
    // Adicionando o filtro de status se fornecido
    if (status) {
      query += " AND cp.status = ?";
      params.push(status);
    }
  
    // Executando a query com os parâmetros dinamicamente montados
    db.query(query, params, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  
}

class GeradorRelatorioVenda {
  static getReport({ startDate, endDate, employeeId }, callback) {
    let query = `
      SELECT 
        v.vendaID, v.dataVenda, v.totalVenda, v.desconto, 
        u.nomeCompleto as nomeUsuario, 
        SUM(iv.quantidade) as quantidade,
        GROUP_CONCAT(
          CONCAT(p.nomeProduto, ' (', iv.quantidade, ' x ', iv.valortotalproduto, ')')
          SEPARATOR ', '
        ) AS produtosVendidos
      FROM venda v
      JOIN usuario u ON v.usuario_usuarioID = u.usuarioID
      JOIN itemvenda iv ON v.vendaID = iv.venda_vendaID
      JOIN produto p ON iv.Produto_produtoID = p.produtoID
      WHERE v.dataVenda BETWEEN ? AND ?
    `;

    const params = [startDate, endDate];

    // Se o filtro por usuário for aplicado
    if (employeeId) {
      query += " AND u.usuarioID = ?";
      params.push(employeeId);
    }

    query += `
      GROUP BY v.vendaID, v.dataVenda, v.totalVenda, v.desconto, u.nomeCompleto
      ORDER BY v.dataVenda DESC;
    `;

    db.query(query, params, callback);
  }
}


// Exportando ambas as classes
module.exports = {
  GeradorRelatorio,
  GeradorRelatorioContasReceber,
  GeradorRelatorioContasPagar,
  GeradorRelatorioVenda
};
