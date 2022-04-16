const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/conexao");
const tabelas = require("./infraestrutura/tabelas");

const app = customExpress();
const port = 3000;

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    tabelas.init(conexao);
    console.log("Conexão com o BD realizada com sucesso");
    app.listen(port, () => {
      console.log(`LAS-API ouvindo na porta: ${port}`);
    });
  }
});
