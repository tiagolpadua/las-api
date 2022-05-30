const Eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res) => {
    Eventos.listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.post("/eventos", (req, res) => {
    const evento = req.body;
    Eventos.adicionar(evento)
      .then((resultados) =>
        res.status(201).json({ id: resultados.insertId, ...evento })
      )
      .catch((erros) => res.status(400).json(erros));
  });

  app.put("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Eventos.alterar(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => res.status(404).json(erros));
  });

  app.delete("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Eventos.excluir(id)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => res.status(404).json(erros));
  });

  app.get("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Eventos.buscaPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(404).json(erros));
  });
  app.get("/eventos/status/:status", (req, res) => {
    const { status } = req.params;
    Eventos.buscaPorStatus(status)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(404).json(erros));
  });
};
