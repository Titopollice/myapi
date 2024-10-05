const db = require("../db");

class Cliente {
  static getAll(callback) {
    db.query("SELECT * FROM cliente", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM cliente WHERE clienteID = ?", [id], callback);
  }
  
  static getByName(nome, callback) {
    db.query("SELECT * FROM cliente WHERE nome LIKE ?", [`%${nome}%`], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO cliente (nome, cpf, telefone, idEndereco, numero, endereco, bairro, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [data.nome, data.cpf, data.telefone, data.idEndereco, data.numero, data.endereco, data.bairro, data.email],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE cliente SET nome = ?, cpf = ?, telefone = ?, idEndereco = ?, numero = ?, endereco = ?, bairro = ?, email = ? WHERE clienteID = ?",
      [data.nome, data.cpf, data.telefone, data.idEndereco, data.numero, data.endereco, data.bairro, data.email, id],
      callback
    );
  }

  static delete(id, callback) {
    console.log("Executing query: SELECT status FROM cliente WHERE clienteID = ?", [id]);

    db.query("SELECT status FROM cliente WHERE clienteID = ?", [id], (err, results) => {
      if (err) return callback(err);

      const currentStatus = results[0].status;
      const newStatus = currentStatus === 'Ativo' ? 'Inativo' : 'Ativo';

      console.log(`Executing query: UPDATE cliente SET status = ? WHERE clienteID = ?`, [newStatus, id]);

      db.query(
        "UPDATE cliente SET status = ? WHERE clienteID = ?",
        [newStatus, id],
        callback
      );
    });
  }

}

module.exports = Cliente;
