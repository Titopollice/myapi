// models/CategoriaProduto.js
const db = require("../db");

class CategoriaProduto {
  static getAll(callback) {
    db.query("SELECT * FROM categoriaproduto", callback);
  }

  static getById(id, callback) {
    db.query(
      "SELECT * FROM categoriaproduto WHERE idcategoriaProduto = ?",
      [id],
      callback
    );
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO categoriaproduto (categoria) VALUES (?)",
      [data.categoria],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE categoriaproduto SET categoria = ? WHERE idcategoriaProduto = ?",
      [data.categoria, id],
      callback
    );
  }

  static delete(id, callback) {
    db.query(
      "DELETE FROM categoriaproduto WHERE idcategoriaProduto = ?",
      [id],
      callback
    );
  }
}

module.exports = CategoriaProduto;
