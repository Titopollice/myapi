// controllers/fornecedorController.js
const db = require("../db");

exports.getAllFornecedores = (req, res) => {
  db.query("SELECT * FROM fornecedor", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getFornecedorById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM fornecedor WHERE fornecedorID = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
};

exports.createFornecedor = (req, res) => {
  const {
    nome,
    cnpj,
    idInformacoesPessoais,
    idEndereco,
    contato_idContato,
    usuario_usuarioID,
  } = req.body;
  db.query(
    "INSERT INTO fornecedor (nome, cnpj, idInformacoesPessoais, idEndereco, contato_idContato, usuario_usuarioID) VALUES (?, ?, ?, ?, ?, ?)",
    [
      nome,
      cnpj,
      idInformacoesPessoais,
      idEndereco,
      contato_idContato,
      usuario_usuarioID,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateFornecedor = (req, res) => {
  const { id } = req.params;
  const {
    nome,
    cnpj,
    idInformacoesPessoais,
    idEndereco,
    contato_idContato,
    usuario_usuarioID,
  } = req.body;
  db.query(
    "UPDATE fornecedor SET nome = ?, cnpj = ?, idInformacoesPessoais = ?, idEndereco = ?, contato_idContato = ?, usuario_usuarioID = ? WHERE fornecedorID = ?",
    [
      nome,
      cnpj,
      idInformacoesPessoais,
      idEndereco,
      contato_idContato,
      usuario_usuarioID,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Fornecedor updated successfully" });
    }
  );
};

exports.deleteFornecedor = (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM fornecedor WHERE fornecedorID = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Fornecedor deleted successfully" });
    }
  );
};
