const customExpress = require("./config/customExpress");
const app = customExpress();
const Tabelas = require("./infraestrutura/tabelas");
const conexao = require("./infraestrutura/conexao");

const port = 3000;

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
