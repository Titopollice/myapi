const db = require("../db");

class Venda {
  static getAll(callback) {
    db.query("SELECT * FROM venda", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM venda WHERE vendaID = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO venda (dataVenda, totalVenda, desconto, usuario_usuarioID) VALUES (?, ?, ?, ?)", 
      [
        data.dataVenda,
        data.totalVenda,
        data.desconto,
        data.usuario_usuarioID, 
      ],
      (err, result) => {
        if (err) return callback(err);
  
        const vendaID = result.insertId;
        const items = data.items; 
  
        // Inserir os itens da venda (itemvenda)
        const queries = items.map((item) => {
          return new Promise((resolve, reject) => {
            db.query(
              "INSERT INTO itemvenda (quantidade, valorproduto, valortotalproduto, valordescontoproduto, venda_vendaID, Produto_produtoID) VALUES (?, ?, ?, ?, ?, ?)",
              [
                item.quantidade,
                item.valorproduto,
                item.valortotalproduto,
                item.valordescontoproduto,
                vendaID,
                item.produtoID,
              ],
              (err) => {
                if (err) return reject(err);
  
                // Atualizar o estoque do produto após inserir o item da venda
                db.query(
                  "UPDATE produto SET estoque = estoque - ? WHERE produtoID = ?",
                  [item.quantidade, item.produtoID],
                  (err) => {
                    if (err) reject(err);
                    else resolve();
                  }
                );
              }
            );
          });
        });
  
        // Executa todas as queries de inserção e atualização do estoque
        Promise.all(queries)
          .then(() => callback(null, result))
          .catch(callback);
      }
    );
  }
  
  

  static update(id, data, callback) {
    db.query(
      "UPDATE venda SET dataVenda = ?, totalVenda = ?, desconto = ?, usuarioID = ? WHERE vendaID = ?",
      [
        data.dataVenda,
        data.totalVenda,
        data.desconto,
        data.usuarioID,
        id,
      ],
      callback
    );
  }

  static delete(id, callback) {
    // Deletar itens associados antes de deletar a venda
    db.query("DELETE FROM itemvenda WHERE venda_vendaID = ?", [id], (err) => {
      if (err) return callback(err);

      db.query("DELETE FROM venda WHERE vendaID = ?", [id], callback);
    });
  }

  // Novo método para buscar o produto pelo código de barras
  static getProductByBarcode(barcode, callback) {
    db.query(
      "SELECT produtoID, nomeProduto, preco FROM produto WHERE codigodebarras = ?",
      [barcode],
      callback
    );
  }
}

module.exports = Venda;
