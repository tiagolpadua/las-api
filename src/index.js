const customExpress = require("./config/customExpress");
const port = 3033;
const conexao = require("./infraestrutura/conexao");

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    const app = customExpress();
    app.listen(port, () => {
      console.log(`LAS-API ouvindo na porta: ${port}`);
    });
  }
});

