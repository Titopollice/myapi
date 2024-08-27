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
    razao,
    numero,
    contato_idContato,
    bairro,
    telefone,
    complemento,
    email,
  } = req.body;
  db.query(
    "INSERT INTO fornecedor (nome, cnpj, razao, numero, contato_idContato, bairro, telefone, complemento, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nome,
      cnpj,
      razao,
      numero,
      contato_idContato,
      bairro,
      telefone,
      complemento,
      email,
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
    razao,
    numero,
    contato_idContato,
    bairro,
    telefone,
    complemento,
    email,
  } = req.body;
  db.query(
    "UPDATE fornecedor SET nome = ?, cnpj = ?, razao = ?, numero = ?, contato_idContato = ?, bairro = ?, telefone = ?, complemento = ?, email = ? WHERE fornecedorID = ?",
    [
      nome,
      cnpj,
      razao,
      numero,
      contato_idContato,
      bairro,
      telefone,
      complemento,
      email,
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
