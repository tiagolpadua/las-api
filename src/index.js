const customExpress = require("./config/customExpress");
const port = 3000;
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("../src/infraestrutura/tabelas");

conexao.connect((erro) => {
   if (erro) {
      console.log(erro);
   } else {
     Tabelas.init(conexao);

     const app = customExpress();
     
     app.get("/", (req, res) => {
      res.send("Olá Mundo!");
    });

     app.listen(port, () => {
       console.log(`LAS-API ouvindo na porta: ${port}`);
     });
   }
 });


