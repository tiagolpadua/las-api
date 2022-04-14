const express = require("express");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");
const port = 3000;
const app = express();

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("conectado com sucesso");

    Tabelas.init(conexao);

    // const app = customExpress();

    app.get("/", (req, res) => {
      res.send("Olá Mundo!");
    });

    app.listen(port, () => {
      console.log(`LAS-API ouvindo na porta: ${port}`);
    });
  }
});
