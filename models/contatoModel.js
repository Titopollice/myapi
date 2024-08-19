// models/Contato.js
const db = require("../db");

class Contato {
  static getAll(callback) {
    db.query("SELECT * FROM contato", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM contato WHERE idContato = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO contato (Cliente_clienteID, email, telefone) VALUES (?, ?, ?)",
      [data.Cliente_clienteID, data.email, data.telefone],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE contato SET Cliente_clienteID = ?, email = ?, telefone = ? WHERE idContato = ?",
      [data.Cliente_clienteID, data.email, data.telefone, id],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM contato WHERE idContato = ?", [id], callback);
  }
}

module.exports = Contato;
