const express = require("express");
const conexao = require("./infraestrutura/conexao");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Olá Mundo!");
});

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("conectado com sucesso");

    app.listen(port, () => {
      console.log(`LAS-API ouvindo na porta: ${port}`);
    });
  }
});
