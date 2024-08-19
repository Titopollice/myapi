// models/Relatorio.js
const db = require("../db");

class Relatorio {
  static getAll(callback) {
    db.query("SELECT * FROM relatorio", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM relatorio WHERE idrelatorio = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO relatorio (tipoRelatorio, dataCriacao, usuario_usuarioID) VALUES (?, ?, ?)",
      [data.tipoRelatorio, data.dataCriacao, data.usuario_usuarioID],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE relatorio SET tipoRelatorio = ?, dataCriacao = ?, usuario_usuarioID = ? WHERE idrelatorio = ?",
      [data.tipoRelatorio, data.dataCriacao, data.usuario_usuarioID, id],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM relatorio WHERE idrelatorio = ?", [id], callback);
  }
}

module.exports = Relatorio;
