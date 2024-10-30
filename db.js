require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env
const mysql = require("mysql2");

// Configuração da conexão usando a URL única
const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL.");
  }
});

module.exports = db;
