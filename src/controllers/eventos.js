const Eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res, next) => {
    Eventos.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Eventos.buscaPorId(id)
      .then((evento) => (evento ? res.json(evento) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.post("/eventos", (req, res, next) => {
    const evento = req.body;
    Eventos.adicionar(evento)
      .then((eventosAdicionado) =>
        eventosAdicionado
          ? res.status(201).json(eventosAdicionado)
          : res.status(404).send()
      )
      .catch((erros) => next(erros));
  });

  app.put("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Eventos.alterar(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => res.status(400).json(erros));
  });

  app.delete("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Eventos.excluir(id)
      .then(() => res.json({ id }))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/eventos/status/:status", (req, res, next) => {
    const status = req.params.status;
    Eventos.listarPorStatus(status)
      .then((evento) => (evento ? res.json(evento) : res.status(404).send()))
      .catch((erros) => next(erros));
    // .then((resultados) => res.json(resultados))
    // .catch((erros) => next(erros));
  });
};
