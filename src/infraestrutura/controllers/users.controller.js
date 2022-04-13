const Tabelas = require("../models/Tabelas");

module.exports = (app) => {
  // Listar todos os usuários cadastrados
  app.get("/users", Tabelas.listarUsuarios);

  /** Buscar usuários por ID
   *  @params { id: number }
   **/
  app.get("/users/:id?", Tabelas.buscarUsuariosPorId);

  /** Buscar usuários por nome
   *  @params { nome: String }
   **/
  app.get("/users/nome/:nome?", Tabelas.buscarUsuariosPorNome);

  /** Criar usuários
   *  @params { nome: String, urlFotoPerfil: String  }
   **/
  app.post("/users/", Tabelas.cadastrarUsuario);

  /** Deletar usuários
   *  @params {id: number}
   **/
  app.delete("/users/:id?", Tabelas.deletarUsuario);

  /** Deletar usuários
   *  @params {id: number}
   **/
  // app.put("/users/:id?", (req, res) => {
  //   Tabelas.atualizarInformacaoUsuario(req.body, res);
  // });
};
