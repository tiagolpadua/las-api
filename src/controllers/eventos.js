const Eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res) => {
    Eventos.listar()
      .then((eventos) => res.status(200).json(eventos))
      .catch((erro) => res.status(400).json(erro));
  });
  app.get("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Eventos.detalharEvento(id)
      .then((evento) => res.status(200).json(evento))
      .catch((erro) => res.status(400).json(erro));
  });
  app.post("/eventos", (req, res) => {
    const evento = req.body;
    Eventos.incluirEvento(evento)
      .then((evento) => res.status(200).json(evento))
      .catch((erro) => res.status(400).json(erro));
  });
  app.put("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Eventos.alterarEvento(id, valores)
      .then((evento) => res.status(200).json(evento))
      .catch((erro) => res.status(400).json(erro));
  });

  app.delete("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Eventos.excluirEvento(id)
      .then((evento) => res.status(200).json(evento))
      .then((erro) => res.status(400).json(erro));
  });
  app.get("/eventos/status/:status", (req, res) => {
    const status = req.params.status;
    Eventos.listarPorStatus(status)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erro) => res.status(400).json(erro));
  });
};
