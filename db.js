require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const mysql = require('mysql2');

// Configuração da conexão com o banco de dados usando variáveis de ambiente
const db = mysql.createConnection({
<<<<<<< Updated upstream
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
=======
  host: "localhost",
  user: "root",
  password: "30042002",
  database: "db_adegas",
>>>>>>> Stashed changes
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL.');
  }
});

module.exports = db;
