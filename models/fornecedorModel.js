const db = require("../db");

class Fornecedor {
  static getAll(callback) {
    db.query("SELECT * FROM fornecedor", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM fornecedor WHERE fornecedorID = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO fornecedor (nome, cnpj, razao, numero, contato_idContato, bairro, telefone, complemento, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.nome,
        data.cnpj,
        data.razao,
        data.numero,
        data.contato_idContato,
        data.bairro,
        data.telefone,
        data.complemento,
        data.email,
      ],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE fornecedor SET nome = ?, cnpj = ?, razao = ?, numero = ?, contato_idContato = ?, bairro = ?, telefone = ?, complemento = ?, email = ? WHERE fornecedorID = ?",
      [
        data.nome,
        data.cnpj,
        data.razao,
        data.numero,
        data.contato_idContato,
        data.bairro,
        data.telefone,
        data.complemento,
        data.email,
        id,
      ],
      callback
    );
  }

  static delete(id, callback) {
    console.log("Executing query: SELECT status FROM fornecedor WHERE fornecedorID = ?", [id]);

    db.query("SELECT status FROM fornecedor WHERE fornecedorID = ?", [id], (err, results) => {
      if (err) return callback(err);

      const currentStatus = results[0].status;
      const newStatus = currentStatus === 'Ativo' ? 'Inativo' : 'Ativo';

      console.log(`Executing query: UPDATE fornecedor SET status = ? WHERE fornecedorID = ?`, [newStatus, id]);
      
      db.query(
        "UPDATE fornecedor SET status = ? WHERE fornecedorID = ?",
        [newStatus, id],
        callback
      );
    });
  }
}

module.exports = Fornecedor;
