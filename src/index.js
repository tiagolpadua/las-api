const customExpress = require("./config/customExpress");

const app = customExpress();

const port = 3000;

app.listen(port, () => console.log(`LAS-API ouvindo na porta: ${port}`));
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("conecção estabelecida");
    Tabelas.init(conexao);
  }
});
