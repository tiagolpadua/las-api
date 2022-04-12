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

  listarUsuarios(res, conn) {
    const path = "/sql/get.users.sql";
    const listUsers = fs.readFileSync(process.cwd() + path).toString();

    conn.query(listUsers, (err, result) => err || res.json(result));
  }

  buscarUsuariosPorId(id, res, conn) {
    const path = "/sql/get.users.id.sql";
    let query = fs.readFileSync(process.cwd() + path).toString();

    conn.query(query, [id], (err, result) => err || res.json(result));
  }
}

module.exports = Tabelas;
