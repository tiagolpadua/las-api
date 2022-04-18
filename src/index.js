
const port = 3000;
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");
const customExpress = require("./config/customExpress");
const app = customExpress();

conexao.connect(erro => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("conectado com sucesso");

    Tabelas.init(conexao);

    app.listen(port, () => {
      console.log(`LAS-API ouvindo na porta: ${port}`);
    });
  }
});







