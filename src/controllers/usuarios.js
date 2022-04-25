const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuarios.buscaPorUsuario(res);
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuarios.buscaPorId(id, res);
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuarios.deleta(id, res);
  });

  app.post("/usuarios", (req, res) => {
    const usuario = req.body;

    Usuarios.adiciona(usuario, res);
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;

    Usuarios.buscaPorNome(nome, res);
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    Usuarios.altera(id, valores, res);
  });
};
