//const express = require("express");
const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");

// const app = express();
const port = 3000;

conexao.connect(erro => {
  if(erro){
      console.log(erro);
  } else {
      console.log("Conectado com sucesso");

      Tabelas.init(conexao);
      const app = customExpress();

      //Home
      app.get("/", (req, res) => {
        res.send("Olá Mundo!");
      });
      
      app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
  }
});
