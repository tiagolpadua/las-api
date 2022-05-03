const customExpress = require("./config/customExpress");
const pool = require("./infraestrutura/database/conexao");
const Tabelas = require("./infraestrutura/database/tabelas");

const PORT = process.env.PORT || 3000;

// Testa conexão com o pool
pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  } else {
    console.log("conectado com sucesso");
    connection.release();

    Tabelas.init(pool);
    const app = customExpress();

    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  }
});
