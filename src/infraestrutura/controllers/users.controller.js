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
  app.get("/users/nome/:nome?", (req, res) => {
    const { nome } = req.params;
    Tabelas.buscarUsuariosPorNome(nome, req, res);
  });

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
   *  @body {nome: String, urlFotoPerfil: String}
   **/
  app.put("/users/:id?", Tabelas.atualizarUsuario);
};
