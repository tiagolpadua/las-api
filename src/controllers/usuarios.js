const Usuario = require("../models/usuarios");

module.exports = (app) => {
  // Refatorado - Ok
  app.get("/usuarios", (req, res, next) => {
    Usuario.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuario.buscarPorId(id, res, next);
  });

  // Refatorado - Ok
  app.post("/usuarios", (req, res, next) => {
    const usuario = req.body;
    Usuario.adicionar(usuario)
      .then((usuarioAdicionado) => res.status(201).json(usuarioAdicionado))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuario.alterar(id, valores, res, next);
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuario.excluir(id, res, next);
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuario.buscarPorNome(nome, res, next);
  });
};
