const Eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res, next) => {
    Eventos.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Eventos.buscarPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });
  app.get("/eventos/status/:status", (req, res, next) => {
    const { status } = req.params;
    Eventos.buscaPorStatus(status)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.post("/eventos", (req, res, next) => {
    const eventos = req.body;
    Eventos.adicionar(eventos)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Eventos.alterar(id, valores)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.delete("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Eventos.excluir(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/eventos/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Eventos.buscarPorNome(nome)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });
};
