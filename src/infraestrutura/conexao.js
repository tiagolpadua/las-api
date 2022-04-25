const mysql = require("mysql");
const conexao = mysql.createConnection({
  host: "localhost",
  port: 3000,
  user: "root",
  password: "",
  database: "las",
});

module.exports = conexao;
