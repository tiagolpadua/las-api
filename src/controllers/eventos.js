const Eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos/status/:status", (req, res, next) => {
    const status = req.params.status;
    Eventos.listarPorStatus(status)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/eventos", (_req, res, next) => {
    Eventos.listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Eventos.buscaPorId(id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  app.post("/eventos", (req, res, next) => {
    const evento = req.body;
    Eventos.adicionar(evento)
      .then((resultados) =>
        res.status(201).json({ id: resultados.insertId, ...evento })
      )
      .catch((erros) => next(erros));
  });

  app.put("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Eventos.alterar(valores, id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  app.delete("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Eventos.excluir(id)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });
};
