const express = require("express");
const conn = require("./services/conexao");
const Tabelas = require("../src/models/Tabelas");

const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Olá Mundo!");
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  conn.query("CREATE DATABASE if not exists las", (err) => {
    if (err) throw err;

    new Tabelas().init(conn);

    app.listen(port, () => console.log(`LAS-API ouvindo na porta: ${port}`));
  });
});
