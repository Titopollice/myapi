const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarioModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");
const usuarioController = require("../controllers/usuarioController"); // Certifique-se de ajustar o caminho para o correto

// Rota para solicitar a recuperação de senha
router.post("/forgot-password", usuarioController.forgotPassword);

// Rota para redefinir a senha com o token
router.post("/reset-password/:token", usuarioController.resetPassword);

// Rota de Login
router.post("/login", (req, res) => {
  const { usuarioLogin, senha } = req.body;

  // Busca o usuário por login
  Usuario.getByLogin(usuarioLogin, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    // Compara a senha com o hash armazenado
    bcrypt.compare(senha, user.senha, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!isMatch) return res.status(401).json({ message: "Senha incorreta" });

      // Gera o token JWT
      const token = jwt.sign({ id: user.usuarioID }, "seu_segredo_jwt", {
        expiresIn: "1h",
      });
      res.json({ token });
    });
  });
});

// Rota protegida - Listar todos os usuários (Exemplo)
router.get("/", (req, res) => {
  Usuario.getAll((err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

// Outras rotas (CRUD padrão)...
router.get("/:id", (req, res) => {
  Usuario.getById(req.params.id, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(result);
  });
});

router.get("/nome/:usuarioLogin", (req, res) => {
  Usuario.getByName(req.params.usuarioLogin, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
    } else {
      res.json(result);
    }
  });
});

router.post("/", (req, res) => {
  Usuario.create(req.body, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  Usuario.update(req.params.id, req.body, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ affectedRows: result.affectedRows });
  });
});

router.patch("/:id", (req, res) => {
  Usuario.delete(req.params.id, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ affectedRows: result.affectedRows });
  });
});

module.exports = router;
