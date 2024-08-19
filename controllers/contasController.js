// controllers/contasController.js
const db = require("../db");

exports.getAllContas = (req, res) => {
  db.query("SELECT * FROM contas", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getContaById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM contas WHERE contaID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.createConta = (req, res) => {
  const {
    descricao,
    valor,
    dataVencimento,
    status,
    tipoConta,
    Fornecedor_fornecedorID,
    Cliente_clienteID,
    usuario_usuarioID,
  } = req.body;
  db.query(
    "INSERT INTO contas (descricao, valor, dataVencimento, status, tipoConta, Fornecedor_fornecedorID, Cliente_clienteID, usuario_usuarioID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      descricao,
      valor,
      dataVencimento,
      status,
      tipoConta,
      Fornecedor_fornecedorID,
      Cliente_clienteID,
      usuario_usuarioID,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.updateConta = (req, res) => {
  const { id } = req.params;
  const {
    descricao,
    valor,
    dataVencimento,
    status,
    tipoConta,
    Fornecedor_fornecedorID,
    Cliente_clienteID,
    usuario_usuarioID,
  } = req.body;
  db.query(
    "UPDATE contas SET descricao = ?, valor = ?, dataVencimento = ?, status = ?, tipoConta = ?, Fornecedor_fornecedorID = ?, Cliente_clienteID = ?, usuario_usuarioID = ? WHERE contaID = ?",
    [
      descricao,
      valor,
      dataVencimento,
      status,
      tipoConta,
      Fornecedor_fornecedorID,
      Cliente_clienteID,
      usuario_usuarioID,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Conta updated successfully" });
    }
  );
};

exports.deleteConta = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM contas WHERE contaID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Conta deleted successfully" });
  });
};
