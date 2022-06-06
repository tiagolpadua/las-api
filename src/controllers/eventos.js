const Eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res) => {
    Eventos.listarEventos()
      .then((eventos) => res.status(200).json(eventos))
      .catch((erro) => res.status(400).json(erro));
  });
  app.get("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Eventos.detalharEvento(id)
      .then((evento) =>
        evento ? res.status(200).json(evento) : res.status(400).end()
      )
      .catch((erros) => next(erros));
  });
  app.post("/eventos", (req, res) => {
    const evento = req.body;
    Eventos.incluirEvento(evento)
      .then((resultado) =>
        res.status(200).json({ id: resultado.inserId, ...evento })
      )
      .catch((erros) => res.status(400).json(erros));
  });
  app.put("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Eventos.alterarEvento(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => res.status(404).json(erros));
  });

  app.delete("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Eventos.excluirEvento(id)
      .then((evento) => res.status(200).json(evento))
      .catch((erro) => res.status(400).json(erro));
  });
  app.get("/eventos/status/:status", (req, res) => {
    const status = req.params.status;
    Eventos.buscarEventosPorStatus(status)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
};
