const Eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res) => {
    Eventos.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Eventos.buscaPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/eventos/status/:status", (req, res) => {
    const status = req.params.status;

    Eventos.buscaPorStatus(status)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.post("/eventos", (req, res) => {
    const evento = req.body;
    Eventos.adicionar(evento)
      .then((resultados) => res.json({ id: resultados.insertId, ...evento }))
      .catch((erros) => res.status(400).json(erros));
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
};