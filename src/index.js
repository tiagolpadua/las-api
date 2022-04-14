const express = require("express");
const conexao = require("./infraestrutura/conexao");
const app = express();
const port = 3000;
const Tabelas = require("./infraestrutura/tabelas");

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("conecção estabelecida");
    Tabelas.init(conexao);
  }
});

app.get("/", (req, res) => {
  res.send("Olá Mundo!");
});

app.listen(port, () => {
  console.log(`LAS-API ouvindo na porta: ${port}`);
});
