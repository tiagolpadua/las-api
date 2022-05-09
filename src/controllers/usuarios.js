const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  //Refatoração - OK
  app.get("/usuarios", (req, res, next) => {
    Usuarios.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  //Refatoração - OK
  app.post("/usuarios", (req, res, next) => {
    const usuarios = req.body;
    Usuarios.adicionar(usuarios)
      .then((usuariosAdicionado) => res.status(201).json(usuariosAdicionado))
      .catch((erros) => next(erros));
  });

  //Refatoração - OK
  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((resultado) => res.json(resultado))
      .catch((erros) => next(erros));
  });

  //Refatoração - OK
  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then((resultado) => res.json(resultado))
      .catch((erros) => next(erros));
  });

  //Refatoração - OK
  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id).catch((erros) => next(erros));
  });

  //Refatoração - OK
  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuarios.buscaPorNome(nome)
      .then((resultado) => res.json(resultado))
      .catch((erros) => next(erros));
  });
};
