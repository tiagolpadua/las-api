const fs = require("fs");

class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criarUsuarios();
  }

  criarUsuarios() {
    const path = "/sql/create.table.users.sql";
    const createUserQuery = fs.readFileSync(process.cwd() + path).toString();

    this.conexao.query(createUserQuery, (err) =>
      console.log(err || "Tabela Usuários criada com sucesso")
    );
  }
  buscarUsuarios() {
    const path = "/sql/get.users.sql";
    const listUsers = fs.readFileSync(process.cwd() + path).toString();
    this.conexao.query(listUsers, (err) =>
      console.log(err || "Listando usuários")
    );
  }
  buscarUsuariosPorId(id, res) {
    const path = "/sql/get.users.id.sql";
    let query = fs.readFileSync(process.cwd() + path).toString();
    this.conexao.query(query, [id], (err, result) =>
      console.log(err || res.json(result))
    );
  }
}

module.exports = Tabelas;
