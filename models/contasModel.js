// models/Contas.js
const db = require("../db");

class Contas {
  // Recupera todas as contas
  static getAll(callback) {
    db.query("SELECT * FROM contas_pagar", callback);
  }

  // Recupera uma conta específica por ID
  static getById(id, callback) {
    db.query("SELECT * FROM contas_pagar WHERE contaID = ?", [id], callback);
  }

  // Cria uma nova conta
  static create(data, callback) {
    db.beginTransaction((err) => {
      if (err) return callback(err);

      // Validação básica
      if (!data.descricao || !data.valor || !data.dataVencimento) {
        return db.rollback(() => callback(new Error("Dados inválidos")));
      }

      db.query(
        "INSERT INTO contas_pagar (descricao, valor, dataVencimento, status, notafiscal) VALUES (?, ?, ?, ?, ?)",
        [data.descricao, data.valor, data.dataVencimento, data.status || 'Pendente', data.notafiscal || null],
        (err, result) => {
          if (err) {
            return db.rollback(() => callback(err));
          }

          const contaID = result.insertId;
          if (data.parcelas && data.parcelas.length > 0) {
            const parcelas = data.parcelas.map((parcela) => [
              contaID,
              parcela.numero,
              parcela.descricao,
              parcela.valor,
              parcela.vencimento,
              parcela.datacriacao || null,
              parcela.status || 'Pendente',
              parcela.data_baixa || null,
            ]);

            db.query(
              "INSERT INTO parcelas_pagar (conta_pagar_id, numero, descricao, valor, vencimento, datacriacao, status, data_baixa) VALUES ?",
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
      if (!data.descricao || !data.valor || !data.dataVencimento) {
        return db.rollback(() => callback(new Error("Dados inválidos")));
      }

      db.query(
        "UPDATE contas_pagar SET descricao = ?, valor = ?, dataVencimento = ?, status = ?, notafiscal = ? WHERE contaID = ?",
        [data.descricao, data.valor, data.dataVencimento, data.status || 'Pendente', data.notafiscal || null, id],
        (err, result) => {
          if (err) {
            return db.rollback(() => callback(err));
          }

          // Deleta todas as parcelas existentes antes de adicionar as novas
          db.query("DELETE FROM parcelas_pagar WHERE conta_pagar_id = ?", [id], (err) => {
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
                parcela.datacriacao || null,
                parcela.status || 'Pendente',
                parcela.data_baixa || null,
              ]);

              db.query(
                "INSERT INTO parcelas_pagar (conta_pagar_id, numero, descricao, valor, vencimento, datacriacao, status, data_baixa) VALUES ?",
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
        "DELETE FROM parcelas_pagar WHERE conta_pagar_id = ?",
        [id],
        (err) => {
          if (err) {
            return db.rollback(() => callback(err));
          }

          db.query(
            "DELETE FROM contas_pagar WHERE contaID = ?",
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
  static updateParcelaStatus(parcelaID, status, data_baixa, callback) {
    db.query(
      "UPDATE parcelas_pagar SET status = ?, data_baixa = ? WHERE parcelaID = ?",
      [status, data_baixa, parcelaID],
      callback
    );
  }
}

module.exports = Contas;
