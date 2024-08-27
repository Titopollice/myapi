const db = require("../db");

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
    if (result.length === 0) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(result[0]);
  });
};

exports.createUsuario = (req, res) => {
  console.log("Dados recebidos:", req.body); // Log dos dados recebidos
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
      senha,
      tipoUsuario_idtipoUsuario,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      // Após a inserção, recupere o usuário recém-criado usando o ID gerado.
      const newUserId = result.insertId;
      db.query("SELECT * FROM usuario WHERE usuarioID = ?", [newUserId], (err, newUser) => {
        if (err) return res.status(500).json({ error: err.message });

        // Retorne o novo usuário completo
        res.status(201).json(newUser[0]);
      });
    }
  );
};

exports.deleteUsuario = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM usuario WHERE usuarioID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json({ message: "Usuário excluído com sucesso" });
  });
};


