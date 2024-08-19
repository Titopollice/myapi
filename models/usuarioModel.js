const db = require("../db");

class Usuario {
  static getAll(callback) {
    db.query("SELECT * FROM usuario", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM usuario WHERE usuarioID = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO usuario (usuarioLogin, nomeCompleto, email, telefone, cpf, cargo, dataNascimento, senha,) VALUES (?, ?, ?, ?, ?, ?, ?, ?,)",
      [
        data.usuarioLogin,
        data.nomeCompleto,
        data.email,
        data.telefone,
        data.cpf,
        data.cargo,
        data.dataNascimento,
        data.senha,
      ],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE usuario SET usuarioLogin = ?, nomeCompleto = ?, email = ?, telefone = ?, cpf = ?, cargo = ?, dataNascimento = ?, senha = ?, tipoUsuario_idtipoUsuario = ? WHERE usuarioID = ?",
      [
        data.usuarioLogin,
        data.nomeCompleto,
        data.email,
        data.telefone,
        data.cpf,
        data.cargo,
        data.dataNascimento,
        data.senha,
        id,
      ],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM usuario WHERE usuarioID = ?", [id], callback);
  }
}

module.exports = Usuario;
