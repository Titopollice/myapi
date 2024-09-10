const db = require("../db");
const bcrypt = require("bcryptjs");

class Usuario {
  static getAll(callback) {
    db.query("SELECT * FROM usuario", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM usuario WHERE usuarioID = ?", [id], callback);
  }

  static getByLogin(usuarioLogin, callback) {
    db.query(
      "SELECT * FROM usuario WHERE usuarioLogin = ?",
      [usuarioLogin],
      (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) return callback(null, null);
        callback(null, results[0]);
      }
    );
  }

  static create(data, callback) {
    // Hash da senha antes de salvar
    bcrypt.hash(data.senha, 10, (err, hashedPassword) => {
      if (err) return callback(err);

      db.query(
        "INSERT INTO usuario (usuarioLogin, nomeCompleto, email, telefone, cpf, cargo, dataNascimento, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          data.usuarioLogin,
          data.nomeCompleto,
          data.email,
          data.telefone,
          data.cpf,
          data.cargo,
          data.dataNascimento,
          hashedPassword, // Salva a senha com hash
        ],
        callback
      );
    });
  }

  static update(id, data, callback) {
    // Hash da senha antes de atualizar
    bcrypt.hash(data.senha, 10, (err, hashedPassword) => {
      if (err) return callback(err);

      db.query(
        "UPDATE usuario SET usuarioLogin = ?, nomeCompleto = ?, email = ?, telefone = ?, cpf = ?, cargo = ?, dataNascimento = ?, senha = ? WHERE usuarioID = ?",
        [
          data.usuarioLogin,
          data.nomeCompleto,
          data.email,
          data.telefone,
          data.cpf,
          data.cargo,
          data.dataNascimento,
          hashedPassword, // Usa o hash da nova senha
          id,
        ],
        callback
      );
    });
  }

  static delete(id, callback) {
    db.query(
      "SELECT status FROM usuario WHERE usuarioID = ?",
      [id],
      (err, results) => {
        if (err) return callback(err);

        const currentStatus = results[0].status;
        const newStatus = currentStatus === "Ativo" ? "Inativo" : "Ativo";

        db.query(
          "UPDATE usuario SET status = ? WHERE usuarioID = ?",
          [newStatus, id],
          callback
        );
      }
    );
  }
}

module.exports = Usuario;
