const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res, next) => {
    Usuarios.listar()
      .then((usuarios) => res.status(200).json(usuarios))
      .catch((erro) => next(erro));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((usuario) => res.status(200).json(usuario))
      .catch((erro) => next(erro));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuarios = req.body;
    Usuarios.adicionar(usuarios)
      .then((usuario) => res.status(201).json(usuario))
      .catch((erro) => next(erro));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then((usuario) => res.status(200).json(usuario))
      .catch((erro) => next(erro));
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
      .then((usuario) => res.status(200).json(usuario))
      .catch((erro) => next(erro));
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((usuario) => res.status(200).json(usuario))
      .catch((erro) => next(erro));
  });
};
