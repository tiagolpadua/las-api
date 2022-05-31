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
      .then((evento) => {
        evento ? res.json(evento) : res.status(404).send();
      })
      .catch((erros) => next(erros));
  });

  app.post("/eventos", (req, res, next) => {
    const evento = req.body;

    Eventos.incluir(evento)
      .then((resultados) => res.status(201).json(resultados))
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
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/eventos/status/:status", (req, res, next) => {
    const status = req.params.status;
    Eventos.listarPorStatus(status)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });
};
