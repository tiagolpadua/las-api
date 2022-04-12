const conn = require("./services/conexao");
const Tabelas = require("../src/models/Tabelas");
const customExpress = require("../config/customExpress");

conn.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  conn.query("CREATE DATABASE if not exists las", (err) => {
    if (err) throw err;
    new Tabelas().init(conn);

    const port = 3000;
    const app = customExpress();

    app.listen(port, () => console.log(`LAS-API ouvindo na porta: ${port}`));
  });
});
