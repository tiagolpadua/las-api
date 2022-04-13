const { getQuery, solve } = require("../utils/functions");

class Tabelas {
  static conexao = null;

  static criarUsuarios() {
    this.conexao.query(getQuery("create.users.table"), (err) =>
      console.log(err || "Tabela Usuários criada com sucesso")
    );
  }

  static listarUsuarios(_, res) {
    Tabelas.conexao.query(getQuery("get.users"), (...params) =>
      solve(params, res)
    );
  }

  static buscarUsuariosPorId({ params: { id } }, res) {
    Tabelas.conexao.query(getQuery("get.user.byID"), [id], (...params) =>
      solve(params, res)
    );
  }

  static buscarUsuariosPorNome({ params: { nome } }, res) {
    Tabelas.conexao.query(getQuery("get.user.byName"), [nome], (...params) =>
      solve(params, res)
    );
  }

  static cadastrarUsuario({ body: { nome, urlFotoPerfil } }, res) {
    Tabelas.conexao.query(
      getQuery("insert.user"),
      [nome, urlFotoPerfil],
      (...params) => solve(params, res, 201)
    );
  }

  static deletarUsuario({ body: { id } }, res) {
    Tabelas.conexao.query(getQuery("delete.user.byID"), [id], (...params) =>
      solve(params, res)
    );
  }
}

module.exports = Tabelas;
