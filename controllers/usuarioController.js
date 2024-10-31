const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Configuração do nodemailer para envio de e-mails
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Configurar no seu .env
    pass: process.env.EMAIL_PASS, // Configurar no seu .env
  },
});

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
      }
    );
  });
};

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

// Função para solicitar a recuperação de senha
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM usuario WHERE email = ?", [email], (err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    if (users.length === 0) {
      return res.status(404).json({ message: "E-mail não encontrado" });
    }

    const user = users[0];

    // Gerar token de recuperação
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000; // 1 hora de validade

    // Atualizar o banco de dados com o token e a data de expiração
    db.query(
      "UPDATE usuario SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?",
      [resetToken, resetPasswordExpires, email],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // Enviar e-mail de recuperação
        const resetURL = `https://erp-adegas.vercel.app/reset-password/${resetToken}`;
        const mailOptions = {
          to: user.email,
          from: process.env.EMAIL_USER,
          subject: "Recuperação de senha",
          text: `Você solicitou a recuperação de senha.\n\nPor favor, clique no seguinte link para redefinir sua senha:\n\n${resetURL}\n\nSe você não solicitou isso, por favor ignore este e-mail.\n`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(200).json({ message: "E-mail de recuperação enviado." });
        });
      }
    );
  });
};

// Função para redefinir a senha
exports.resetPassword = (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  // Adicionar log para depuração
  console.log("Token recebido:", token);
  console.log("Nova senha recebida:", newPassword);

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({
      message: "A nova senha é obrigatória e deve ter pelo menos 6 caracteres.",
    });
  }

  db.query(
    "SELECT * FROM usuario WHERE resetPasswordToken = ? AND resetPasswordExpires > ?",
    [token, Date.now()],
    (err, users) => {
      if (err) return res.status(500).json({ error: err.message });
      if (users.length === 0) {
        console.log("Token não encontrado ou expirado.");
        return res.status(400).json({ message: "Token inválido ou expirado" });
      }

      const user = users[0];

      console.log("Token encontrado para o usuário:", user);

      // Hash da nova senha
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: err.message });

        // Atualizar a senha e limpar o token
        db.query(
          "UPDATE usuario SET senha = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE usuarioID = ?",
          [hashedPassword, user.usuarioID],
          (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: "Senha redefinida com sucesso!" });
          }
        );
      });
    }
  );
};
