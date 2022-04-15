const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");
// const app = express();
const port = 3000;


// app.get("/usuarios", (req, res) => {
//   res.send("Olá Mundo!");
// });

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("conectado com sucesso");

    const app = customExpress();

    Tabelas.init(conexao);

    app.listen(port, () => {
      console.log(`LAS-API ouvindo na porta: ${port}`);
    });
  }
});
