const Eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/usuarios", (req, res, next) => {
    Eventos.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Eventos.buscarPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuarios = req.body;
    Eventos.adicionar(usuarios)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Eventos.alterar(id, valores)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Eventos.excluir(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Eventos.buscarPorNome(nome)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });
};
