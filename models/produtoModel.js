// models/Produto.js
const db = require("../db");

class Produto {
  static getAll(callback) {
    db.query("SELECT * FROM produto", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM produto WHERE produtoID = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO produto (nomeProduto, safra, paisdeorigem, tipodeuva, classificacao, preco, estoque, codigodebarras, temperatura) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.nomeProduto,
        data.safra,
        data.paisdeorigem,
        data.tipodeuva,
        data.classificacao,
        data.preco,
        data.estoque,
        data.codigodebarras,
        data.temperatura,
      ],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE produto SET nomeProduto = ?, safra = ?, paisdeorigem = ?, tipodeuva = ?, classificacao = ?, preco = ?, estoque = ?, codigodebarras = ?, temperatura = ? WHERE produtoID = ?",
      [
        data.nomeProduto,
        data.safra,
        data.paisdeorigem,
        data.tipodeuva,
        data.classificacao,
        data.preco,
        data.estoque,
        data.codigodebarras,
        data.temperatura,
        id,
      ],
      callback
    );
  }

  static delete(id, callback) {
    db.query(
      "SELECT status FROM produto WHERE produtoID = ?",
      [id],
      (err, results) => {
        if (err) return callback(err);

        const currentStatus = results[0].status;
        const newStatus = currentStatus === "Ativo" ? "Inativo" : "Ativo";

        db.query(
          "UPDATE produto SET status = ? WHERE produtoID = ?",
          [newStatus, id],
          callback
        );
      }
    );
  }
  
}

module.exports = Produto;
