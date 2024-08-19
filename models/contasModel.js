// models/Contas.js
const db = require("../db");

class Contas {
  static getAll(callback) {
    db.query("SELECT * FROM contas", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM contas WHERE contaID = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO contas (descricao, valor, dataVencimento, status, tipoConta, Fornecedor_fornecedorID, Cliente_clienteID, usuario_usuarioID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.descricao,
        data.valor,
        data.dataVencimento,
        data.status,
        data.tipoConta,
        data.Fornecedor_fornecedorID,
        data.Cliente_clienteID,
        data.usuario_usuarioID,
      ],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE contas SET descricao = ?, valor = ?, dataVencimento = ?, status = ?, tipoConta = ?, Fornecedor_fornecedorID = ?, Cliente_clienteID = ?, usuario_usuarioID = ? WHERE contaID = ?",
      [
        data.descricao,
        data.valor,
        data.dataVencimento,
        data.status,
        data.tipoConta,
        data.Fornecedor_fornecedorID,
        data.Cliente_clienteID,
        data.usuario_usuarioID,
        id,
      ],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM contas WHERE contaID = ?", [id], callback);
  }
}

module.exports = Contas;
