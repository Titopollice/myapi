// models/Produto.js
const db = require("../db");

class Produto {
  static getAll(callback) {
    db.query("SELECT * FROM produto", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM produto WHERE produtoID = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO produto (nomeProduto, dataValidade, categoriaProduto_idcategoriaProduto, usuario_usuarioID) VALUES (?, ?, ?, ?)",
      [
        data.nomeProduto,
        data.dataValidade,
        data.categoriaProduto_idcategoriaProduto,
        data.usuario_usuarioID,
      ],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE produto SET nomeProduto = ?, dataValidade = ?, categoriaProduto_idcategoriaProduto = ?, usuario_usuarioID = ? WHERE produtoID = ?",
      [
        data.nomeProduto,
        data.dataValidade,
        data.categoriaProduto_idcategoriaProduto,
        data.usuario_usuarioID,
        id,
      ],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM produto WHERE produtoID = ?", [id], callback);
  }
}

module.exports = Produto;
