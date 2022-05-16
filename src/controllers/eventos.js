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
};
