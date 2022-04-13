const res = require("express/lib/response");
const fs = require("fs");

class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criarUsuarios();
  }

  criarUsuarios() {
    const path = "/src/sql/create.table.users.sql";
    const createUserQuery = fs.readFileSync(process.cwd() + path).toString();
    this.conexao.query(createUserQuery, (err) =>
      console.log(err || "Tabela Usuários criada com sucesso")
    );
  }

  listarUsuarios(res, conn) {
    const path = "/src/sql/get.users.sql";
    const listUsers = fs.readFileSync(process.cwd() + path).toString();
    conn.query(listUsers, (err, result) => err || res.status(200).json(result));
  }

  buscarUsuariosPorId(id, res, conn) {
    const path = "/sql/get.users.id.sql";
    let query = fs.readFileSync(process.cwd() + path).toString();
    conn.query(
      query,
      [id],
      (err, result) => err || res.status(200).json(result)
    );
  }

  buscarUsuariosPorNome(nome, res, conn) {
    const path = "/src/sql/get.users.name.sql";
    let query = fs.readFileSync(process.cwd() + path).toString();
    conn.query(
      query,
      [nome],
      (err, result) => err || res.status(200).json(result)
    );
  }

  cadastrarUsuario(data) {
    res.status(201).send();
  }
  deletarUsuario(id, res) {
    res.status(200).send("Deletede", res);
  }
}

module.exports = Tabelas;
