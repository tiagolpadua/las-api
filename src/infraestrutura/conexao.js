const mysql = require("mysql");

const conexao = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "las",
  password: "admin",
  database: "las",
});

module.exports = conexao;
