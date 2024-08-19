// models/Endereco.js
const db = require("../db");

class Endereco {
  static getAll(callback) {
    db.query("SELECT * FROM endereco", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM endereco WHERE idEndereco = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO endereco (tipoEndereco, rua, complemento, cidade, estado) VALUES (?, ?, ?, ?, ?)",
      [data.tipoEndereco, data.rua, data.complemento, data.cidade, data.estado],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE endereco SET tipoEndereco = ?, rua = ?, complemento = ?, cidade = ?, estado = ? WHERE idEndereco = ?",
      [
        data.tipoEndereco,
        data.rua,
        data.complemento,
        data.cidade,
        data.estado,
        id,
      ],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM endereco WHERE idEndereco = ?", [id], callback);
  }
}

module.exports = Endereco;
