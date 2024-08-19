const mysql = require("mysql2");

// Configurações do banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

const promisePool = pool.promise();

module.exports = promisePool;
