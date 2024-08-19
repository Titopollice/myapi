// models/Representante.js
const db = require("../db");

class Representante {
  static getAll(callback) {
    db.query("SELECT * FROM representantes", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM representantes WHERE id = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO representantes (nome, email, telefone) VALUES (?, ?, ?)",
      [data.nome, data.email, data.telefone],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE representantes SET nome = ?, email = ?, telefone = ? WHERE id = ?",
      [data.nome, data.email, data.telefone, id],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM representantes WHERE id = ?", [id], callback);
  }
}

module.exports = Representante;
