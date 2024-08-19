// models/Venda.js
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
      "INSERT INTO venda (dataVenda, totalVenda, Cliente_clienteID, usuario_usuarioID) VALUES (?, ?, ?, ?)",
      [
        data.dataVenda,
        data.totalVenda,
        data.Cliente_clienteID,
        data.usuario_usuarioID,
      ],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE venda SET dataVenda = ?, totalVenda = ?, Cliente_clienteID = ?, usuario_usuarioID = ? WHERE vendaID = ?",
      [
        data.dataVenda,
        data.totalVenda,
        data.Cliente_clienteID,
        data.usuario_usuarioID,
        id,
      ],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM venda WHERE vendaID = ?", [id], callback);
  }
}

module.exports = Venda;
