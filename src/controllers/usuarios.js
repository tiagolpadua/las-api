const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuario.listarUsuarios(res);
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuario.buscaUsuario(id, res);
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;

    Usuario.buscaUsuarioPeloNome(nome, res);
  });

  app.post("/usuarios", (req, res) => {
    const retornoForm = req.body;

    Usuario.incluirUsuarios(retornoForm, res);
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const retornoForm = req.body;

    Usuario.alterarUsuario(id, retornoForm, res);
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const retornoForm = req.body;

    Usuario.excluirUsuario(id, retornoForm, res);
  });
};
