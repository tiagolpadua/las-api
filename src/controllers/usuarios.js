const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuario.buscarUsuario(id, res);
  });

  app.post("/usuarios", (req, res) => {
    const newUser = req.body;

    Usuario.incluirUsuario(newUser, res);
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const modificacao = req.body;

    Usuario.alterarUsuario(id, modificacao, res);
  });

  app.get("/usuarios", (req, res) => {
    Usuario.listarUsuarios(res);
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuario.deletarUsuario(id, res);
  });
  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;

    Usuario.buscarUsuarioNome(nome, res);
  });
};
