// models/Cliente.js
const db = require("../db");

class Cliente {
  static getAll(callback) {
    db.query("SELECT * FROM cliente", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM cliente WHERE clienteID = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO cliente (nome, cpf, idInformacoesPessoais, idEndereco) VALUES (?, ?, ?, ?)",
      [data.nome, data.cpf, data.idInformacoesPessoais, data.idEndereco],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE cliente SET nome = ?, cpf = ?, idInformacoesPessoais = ?, idEndereco = ? WHERE clienteID = ?",
      [data.nome, data.cpf, data.idInformacoesPessoais, data.idEndereco, id],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM cliente WHERE clienteID = ?", [id], callback);
  }
}

module.exports = Cliente;
