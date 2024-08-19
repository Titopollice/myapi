// models/Estoque.js
const db = require("../db");

class Estoque {
  static getAll(callback) {
    db.query("SELECT * FROM estoque", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM estoque WHERE idEstoque = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO estoque (quantidadeMinina, ultimaMovimentacao, Produto_produtoID, usuario_usuarioID) VALUES (?, ?, ?, ?)",
      [
        data.quantidadeMinina,
        data.ultimaMovimentacao,
        data.Produto_produtoID,
        data.usuario_usuarioID,
      ],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE estoque SET quantidadeMinina = ?, ultimaMovimentacao = ?, Produto_produtoID = ?, usuario_usuarioID = ? WHERE idEstoque = ?",
      [
        data.quantidadeMinina,
        data.ultimaMovimentacao,
        data.Produto_produtoID,
        data.usuario_usuarioID,
        id,
      ],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM estoque WHERE idEstoque = ?", [id], callback);
  }
}

module.exports = Estoque;
