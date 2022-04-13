const conn = require("../services/conexao");
const Tabelas = require("../models/Tabelas");

module.exports = (app) => {
  const tabela = new Tabelas();

  // Listar todos os usuários cadastrados
  app.get("/users", (req, res) => {
    tabela.listarUsuarios(res, conn);
  });

  /** Buscar usuários por ID
   *  @params { id: number }
   **/
  app.get("/users/:id?", (req, res) => {
    tabela.buscarUsuariosPorId(req.params.id, res, conn);
  });

  /** Buscar usuários por nome
   *  @params { nome: String }
   **/
  app.get("/users/:nome?", (req, res) => {
    tabela.buscarUsuariosPorNome(req.params.nome, res, conn);
  });

  /** Criar usuários
   *  @params { nome: String, urlFotoPerfil: String  }
   **/
  app.post("/users/", (req, res) => {
    tabela.criarUsuarios(req.params.id, res, conn);
  });

  /** Deletar usuários
   *  @params {id: number}
   **/
  app.delete("/users/:id?", (req, res) => {
    tabela.deletarUsuario(req.params.id, res, conn);
  });

  /** Deletar usuários
   *  @params {id: number}
   **/
  app.put("/users/:id?", (req, res) => {
    tabela.atualizarInformacaoUsuario(req.body, res, conn);
  });
};
