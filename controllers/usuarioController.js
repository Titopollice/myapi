const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAllUsuarios = (req, res) => {
  db.query("SELECT * FROM usuario", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getUsuarioById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM usuario WHERE usuarioID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(result[0]);
  });
};

exports.createUsuario = (req, res) => {
  const {
    usuarioLogin,
    nomeCompleto,
    email,
    telefone,
    cpf,
    cargo,
    dataNascimento,
    senha,
    tipoUsuario_idtipoUsuario,
  } = req.body;

  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(
      "INSERT INTO usuario (usuarioLogin, nomeCompleto, email, telefone, cpf, cargo, dataNascimento, senha, tipoUsuario_idtipoUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        usuarioLogin,
        nomeCompleto,
        email,
        telefone,
        cpf,
        cargo,
        dataNascimento,
        hashedPassword,
        tipoUsuario_idtipoUsuario,
      ],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId });
      }
    );
  });
};

const newUserId = result.insertId;
db.query(
  "SELECT * FROM usuario WHERE usuarioID = ?",
  [newUserId],
  (err, newUser) => {
    if (err) return res.status(500).json({ error: err.message });

    // Retorne o novo usuário completo
    res.status(201).json(newUser[0]);
  }
);

exports.loginUsuario = (req, res) => {
  const { usuarioLogin, senha } = req.body;

  db.query(
    "SELECT * FROM usuario WHERE usuarioLogin = ?",
    [usuarioLogin],
    (err, users) => {
      if (err) return res.status(500).json({ error: err.message });
      if (users.length === 0)
        return res.status(404).json({ message: "Usuário não encontrado" });

      const user = users[0];
      bcrypt.compare(senha, user.senha, (err, isMatch) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!isMatch)
          return res.status(401).json({ message: "Senha incorreta" });

        const token = jwt.sign({ id: user.usuarioID }, "seu_segredo_jwt", {
          expiresIn: "1h",
        });
        res.json({ token });
      });
    }
  );
};
