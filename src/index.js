const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("conectado com sucesso");

    Tabelas.init(conexao);
    const app = customExpress();

    app.listen(8080, () => console.log("LAS-API ouvindo na porta porta 8080"));
  }
});
