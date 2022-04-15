const controllers = require("./servidor/infra");

const app = controllers();

const Tabelas = require("./infraestrutura/Tabelas");

const conexao = require("./infraestrutura/conexao");

const port = 3001;

conexao.connect((erro) => {
  if (erro) console.log(erro);
  else {
    app.listen(port, () => {
      console.log(`LAS rodando na porta ${port}`);
    });

    Tabelas.init(conexao);
  }
});
