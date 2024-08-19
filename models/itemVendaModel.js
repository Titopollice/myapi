// models/ItemVenda.js
const db = require("../db");

class ItemVenda {
  static getAll(callback) {
    db.query("SELECT * FROM itemvenda", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM itemvenda WHERE itemVendaID = ?", [id], callback);
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO itemvenda (quantidade, venda_vendaID, Produto_produtoID) VALUES (?, ?, ?)",
      [data.quantidade, data.venda_vendaID, data.Produto_produtoID],
      callback
    );
  }

  static update(id, data, callback) {
    db.query(
      "UPDATE itemvenda SET quantidade = ?, venda_vendaID = ?, Produto_produtoID = ? WHERE itemVendaID = ?",
      [data.quantidade, data.venda_vendaID, data.Produto_produtoID, id],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM itemvenda WHERE itemVendaID = ?", [id], callback);
  }
}

module.exports = ItemVenda;
