// models/Fornecedor.js
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
      "INSERT INTO fornecedor (nome, cnpj, idInformacoesPessoais, idEndereco, contato_idContato, usuario_usuarioID) VALUES (?, ?, ?, ?, ?, ?)",
      [
        data.nome,
        data.cnpj,
        data.idInformacoesPessoais,
        data.idEndereco,
        data.contato_idContato,
        data.usuario_usuarioID,
      ],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE fornecedor SET nome = ?, cnpj = ?, idInformacoesPessoais = ?, idEndereco = ?, contato_idContato = ?, usuario_usuarioID = ? WHERE fornecedorID = ?",
      [
        data.nome,
        data.cnpj,
        data.idInformacoesPessoais,
        data.idEndereco,
        data.contato_idContato,
        data.usuario_usuarioID,
        id,
      ],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM fornecedor WHERE fornecedorID = ?", [id], callback);
  }
}

module.exports = Fornecedor;
