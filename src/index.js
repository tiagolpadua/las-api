const customExpress = require("./config/customExpress");
const app = customExpress();
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");
const port = 3000;

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Conectado com Sucesso!");
    Tabelas.init(conexao);
    app.listen(port, () => console.log(`Servidor Rodando na porta ${port}`));
  }
});
