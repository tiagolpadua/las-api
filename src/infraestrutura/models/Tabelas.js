const { getQuery, solve } = require("../utils/functions");
const validarUrl = require("../utils/validarUrl");

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

  static buscarUsuariosPorNome(nome, req, res) {
    const values = Tabelas.conexao.query(getQuery("get.user.byName"), [nome]);

    if (req) {
      res.json(values);

      return;
    }
    return values;
  }

  static cadastrarUsuario({ body: { nome, urlFotoPerfil } }, res) {
    if (!validarUrl(urlFotoPerfil)) {
      return res.status(400).send("Parâmetro inválido");
    }
    Tabelas.conexao.query(
      getQuery("insert.user"),
      [nome, urlFotoPerfil],
      (...params) => solve(params, res, 201)
    );
  }

  static deletarUsuario({ params: { id } }, res) {
    Tabelas.conexao.query(getQuery("delete.user.byID"), [id], (...params) =>
      solve(params, res)
    );
  }

  static atualizarUsuario(
    { body: { nome, urlFotoPerfil }, params: { id } },
    res
  ) {
    if (!validarUrl(urlFotoPerfil)) {
      return res.status(400).send("Parâmetro inválido");
    }
    Tabelas.conexao.query(
      getQuery("update.users.data"),
      [nome, urlFotoPerfil, id],
      (...params) => solve(params, res)
    );
  }
}

module.exports = Tabelas;
