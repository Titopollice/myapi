const db = require("../db");

class Usuario {
  static getAll(callback) {
    console.log("Executing query: SELECT * FROM usuario");
    db.query("SELECT * FROM usuario", callback);
  }

  static getById(id, callback) {
    console.log("Executing query: SELECT * FROM usuario WHERE usuarioID = ?", [id]);
    db.query("SELECT * FROM usuario WHERE usuarioID = ?", [id], callback);
  }

  static create(data, callback) {
    console.log("Executing query: INSERT INTO usuario (usuarioLogin, nomeCompleto, email, telefone, cpf, cargo, dataNascimento, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
      data.usuarioLogin,
      data.nomeCompleto,
      data.email,
      data.telefone,
      data.cpf,
      data.cargo,
      data.dataNascimento,
      data.senha,
    ]);
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
        data.senha,
      ],
      callback
    );
  }

  static update(id, data, callback) {
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
        data.senha,
        id,
      ],
      callback
    );
  }

  static delete(id, callback) {
    console.log("Executing query: SELECT status FROM usuario WHERE usuarioID = ?", [id]);
    
    db.query("SELECT status FROM usuario WHERE usuarioID = ?", [id], (err, results) => {
      if (err) return callback(err);

      const currentStatus = results[0].status;
      const newStatus = currentStatus === 'Ativo' ? 'Inativo' : 'Ativo';

      console.log(`Executing query: UPDATE usuario SET status = ? WHERE usuarioID = ?`, [newStatus, id]);
      
      db.query(
        "UPDATE usuario SET status = ? WHERE usuarioID = ?",
        [newStatus, id],
        callback
      );
    });
  }
}

module.exports = Usuario;
