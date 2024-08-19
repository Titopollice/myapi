// models/TipoUsuario.js
const db = require("../db");

class TipoUsuario {
  static getAll(callback) {
    db.query("SELECT * FROM tipousuario", callback);
  }

  static getById(id, callback) {
    db.query(
      "SELECT * FROM tipousuario WHERE idtipoUsuario = ?",
      [id],
      callback
    );
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO tipousuario (tipo) VALUES (?)",
      [data.tipo],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE tipousuario SET tipo = ? WHERE idtipoUsuario = ?",
      [data.tipo, id],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM tipousuario WHERE idtipoUsuario = ?", [id], callback);
  }
}

module.exports = TipoUsuario;
