const rotasUsuarios = require("./controllers/usuarios");
const express = require("express");
const conexao = require("./infraestrutura/conexao");
const tabelas = require("./infraestrutura/tabelas");
const app = express();
const port = 3000;

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    tabelas.init(conexao);
    console.log("Conexão com o BD realizada com sucesso");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    rotasUsuarios(app);

    app.listen(port, () => {
      console.log(`LAS-API ouvindo na porta: ${port}`);
    });
  }
});
