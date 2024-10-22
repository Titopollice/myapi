// models/receber.js
const db = require("../db");

class Contas {
  // Recupera todas as contas
  static getAll(callback) {
    db.query("SELECT * FROM contas_receber", callback);
  }

  // Recupera uma conta específica por ID
  static getById(id, callback) {
    db.query("SELECT * FROM contas_receber WHERE contaID = ?", [id], callback);
  }

  static getParcelas(contaId, callback) {
    db.query("SELECT * FROM parcelas_receber WHERE conta_pagar_id = ?", [contaId], (err, results) => {
      console.log("Resultados das parcelas:", results);
      callback(err, results);
    });
  }
    // Cria uma nova conta
  static create(data, callback) {
    db.beginTransaction((err) => {
      if (err) return callback(err);

      // Validação básica
      if (!data.descricao || !data.valor) {
        return db.rollback(() => callback(new Error("Dados inválidos")));
      }

      db.query(
        "INSERT INTO contas_receber (descricao, valor, datacriacao, status, dataVencimento) VALUES (?, ?, ?, ?, ?)",
        [
          data.descricao, 
          data.valor, 
          data.datacriacao || new Date(), 
          data.status || 'Pendente', 
          data.dataVencimento
        ],
        (err, result) => {
          if (err) {
            return db.rollback(() => callback(err));
          }

          const contaID = result.insertId;

          // Se houver parcelas, insere na tabela de parcelas
          if (data.parcelas && data.parcelas.length > 0) {
            const parcelas = data.parcelas.map((parcela) => [
              contaID,
              parcela.numero,
              parcela.descricao,
              parcela.valor,
              parcela.vencimento,
              parcela.datacriacao || new Date(),
              parcela.status || 'Pendente',
              parcela.data_baixa || null,
            ]);

            db.query(
              "INSERT INTO parcelas_receber (conta_pagar_id, numero, descricao, valor, vencimento, datacriacao, status, data_baixa) VALUES ?",
              [parcelas],
              (err) => {
                if (err) {
                  return db.rollback(() => callback(err));
                }

                db.commit((err) => {
                  if (err) {
                    return db.rollback(() => callback(err));
                  }
                  callback(null, result);
                });
              }
            );
          } else {
            db.commit((err) => {
              if (err) {
                return db.rollback(() => callback(err));
              }
              callback(null, result);
            });
          }
        }
      );
    });
  }

  // Atualiza uma conta existente
  static update(id, data, callback) {
    db.beginTransaction((err) => {
      if (err) return callback(err);

      // Validação básica
      if (!data.descricao || !data.valor) {
        return db.rollback(() => callback(new Error("Dados inválidos")));
      }

      db.query(
        "UPDATE contas_receber SET descricao = ?, valor = ?, datacriacao = ?, status = ?, dataVencimento = ? WHERE contaID = ?",
        [
          data.descricao, 
          data.valor, 
          data.datacriacao || new Date(), 
          data.status || 'Pendente', 
          data.dataVencimento, 
          id
        ],
        (err, result) => {
          if (err) {
            return db.rollback(() => callback(err));
          }

          // Deleta todas as parcelas existentes antes de adicionar as novas
          db.query("DELETE FROM parcelas_receber WHERE conta_pagar_id = ?", [id], (err) => {
            if (err) {
              return db.rollback(() => callback(err));
            }

            // Insere novamente as parcelas atualizadas
            if (data.parcelas && data.parcelas.length > 0) {
              const parcelas = data.parcelas.map((parcela) => [
                id,
                parcela.numero,
                parcela.descricao,
                parcela.valor,
                parcela.vencimento,
                parcela.datacriacao || new Date(),
                parcela.status || 'Pendente',
                parcela.data_baixa || null,
              ]);

              db.query(
                "INSERT INTO parcelas_receber (conta_pagar_id, numero, descricao, valor, vencimento, datacriacao, status, data_baixa) VALUES ?",
                [parcelas],
                (err) => {
                  if (err) {
                    return db.rollback(() => callback(err));
                  }

                  db.commit((err) => {
                    if (err) {
                      return db.rollback(() => callback(err));
                    }
                    callback(null, result);
                  });
                }
              );
            } else {
              db.commit((err) => {
                if (err) {
                  return db.rollback(() => callback(err));
                }
                callback(null, result);
              });
            }
          });
        }
      );
    });
  }

  // Deleta uma conta e suas parcelas associadas
  static delete(id, callback) {
    db.beginTransaction((err) => {
      if (err) return callback(err);

      db.query(
        "DELETE FROM parcelas_receber WHERE conta_pagar_id = ?",
        [id],
        (err) => {
          if (err) {
            return db.rollback(() => callback(err));
          }

          db.query(
            "DELETE FROM contas_receber WHERE contaID = ?",
            [id],
            (err) => {
              if (err) {
                return db.rollback(() => callback(err));
              }

              db.commit((err) => {
                if (err) {
                  return db.rollback(() => callback(err));
                }
                callback(null);
              });
            }
          );
        }
      );
    });
  }

  // Atualiza o status de uma parcela específica
  // Atualiza o status de uma parcela específica
static updateParcelaStatus(parcelaID, status, data_baixa, callback) {
  if (!parcelaID || !status) {
    return callback(new Error("ID da parcela e status são obrigatórios"));
  }

  const query = "UPDATE parcelas_receber SET status = ?, data_baixa = ? WHERE parcelaID = ?";
  const values = [status, data_baixa || null, parcelaID];

  db.query(query, values, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
}

}



module.exports = Contas;
