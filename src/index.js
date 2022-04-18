const customExpress = require("./config/customExpress");
const conection = require("../sql/conection");
const Tables = require("../sql/tables");

const PORT = 3000;

conection.connect(erro => {
  if(erro) {
    console.log(erro);
  } else {
    console.log("Conectado ao banco de dados com sucesso");

    Tables.init(conection);
    const app = customExpress();

    app.listen(PORT, () => 
      console.log(`Servidor rodando na porta ${PORT}`)
    );
  }
});
