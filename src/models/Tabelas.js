const fs = require("fs");

class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criarUsuario();
  }

  criarUsuario() {
    const path = "/sql/create.table.users.sql";
    const createUserQuery = fs.readFileSync(process.cwd() + path).toString();

    this.conexao.query(createUserQuery, (err) =>
      console.log(err || "Tabela Usuários criada com sucesso")
    );
  }
}

module.exports = Tabelas;
