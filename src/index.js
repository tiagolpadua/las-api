const express = require("express");
const app = express();
const Tabelas = require("./infraestrutura/tabelas");
const conexao = require("./infraestrutura/conexao");
const consign = require("consign");
const port = 3000;

consign().include("src/controllers").into(app);

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("conectado com sucesso!");

    Tabelas.init(conexao);
  }
});

app.listen(port, () => {
  console.log(`LAS-API ouvindo na porta: ${port}`);
});
