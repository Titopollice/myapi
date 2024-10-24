const db = require("../db");

class Estoque {
  static getAll(callback) {
    db.query("SELECT * FROM estoque", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM estoque WHERE idEstoque = ?", [id], callback);
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      db.beginTransaction(err => {
        if (err) reject(err);
  
        db.query(
          "INSERT INTO estoque (quantidade, DataDaMovimentacao, Produto_produtoID, IdFornecedor) VALUES (?, ?, ?, ?)",
          [data.quantidade, data.DataDaMovimentacao, data.Produto_produtoID, data.IdFornecedor],
          (err, result) => {
            if (err) {
              return db.rollback(() => reject(err));
            }
  
            db.query(
              "UPDATE produto SET estoque = estoque + ? WHERE produtoID = ?",
              [data.quantidade, data.Produto_produtoID],
              (err, updateResult) => {
                if (err) {
                  return db.rollback(() => reject(err));
                }
  
                db.commit(err => {
                  if (err) {
                    return db.rollback(() => reject(err));
                  }
                  resolve(result); // Retorna o resultado da inserção
                });
              }
            );
          }
        );
      });
    });
  }
  
  static update(id, data, callback) {
    db.beginTransaction((err) => {
      if (err) return callback(err);

      // Primeiro, buscamos a quantidade atual do estoque para calcular a diferença
      db.query(
        "SELECT quantidade FROM estoque WHERE idEstoque = ?",
        [id],
        (err, result) => {
          if (err) {
            return db.rollback(() => {
              callback(err);
            });
          }

          const quantidadeAtual = result[0].quantidade;
          const diferenca = data.quantidade - quantidadeAtual;

          // Atualizar a tabela de estoque
          db.query(
            "UPDATE estoque SET quantidade = ?, DataDaMovimentacao = ?, Produto_produtoID = ?, IdFornecedor = ? WHERE idEstoque = ?",
            [
              data.quantidade,
              data.DataDaMovimentacao,
              data.Produto_produtoID,
              data.IdFornecedor,
              id,
            ],
            (err, result) => {
              if (err) {
                return db.rollback(() => {
                  callback(err);
                });
              }

              // Atualizar o campo 'estoque' na tabela produto com a diferença
              db.query(
                "UPDATE produto SET estoque = estoque + ? WHERE produtoID = ?",
                [diferenca, data.Produto_produtoID],
                (err, result) => {
                  if (err) {
                    return db.rollback(() => {
                      callback(err);
                    });
                  }

                  // Se tudo deu certo, comitar a transação
                  db.commit((err) => {
                    if (err) {
                      return db.rollback(() => {
                        callback(err);
                      });
                    }
                    callback(null, result);
                  });
                }
              );
            }
          );
        }
      );
    });
  }

  static delete(id, callback) {
    db.beginTransaction((err) => {
      if (err) return callback(err);

      // Primeiro, buscamos a quantidade e o produto relacionado ao estoque que será deletado
      db.query(
        "SELECT quantidade, Produto_produtoID FROM estoque WHERE idEstoque = ?",
        [id],
        (err, result) => {
          if (err) {
            return db.rollback(() => {
              callback(err);
            });
          }

          const quantidade = result[0].quantidade;
          const produtoID = result[0].Produto_produtoID;

          // Deletar o registro do estoque
          db.query(
            "DELETE FROM estoque WHERE idEstoque = ?",
            [id],
            (err, result) => {
              if (err) {
                return db.rollback(() => {
                  callback(err);
                });
              }

              // Subtrair a quantidade do campo 'estoque' na tabela produto
              db.query(
                "UPDATE produto SET estoque = estoque - ? WHERE produtoID = ?",
                [quantidade, produtoID],
                (err, result) => {
                  if (err) {
                    return db.rollback(() => {
                      callback(err);
                    });
                  }

                  // Se tudo deu certo, comitar a transação
                  db.commit((err) => {
                    if (err) {
                      return db.rollback(() => {
                        callback(err);
                      });
                    }
                    callback(null, result);
                  });
                }
              );
            }
          );
        }
      );
    });
  }
}

module.exports = Estoque;
