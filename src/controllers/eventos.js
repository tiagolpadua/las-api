const Eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res) =>
    Eventos.listarEventos()
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => res.status(400).json(erros))
  );

  app.get("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Eventos.buscarPorId(id)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
};
