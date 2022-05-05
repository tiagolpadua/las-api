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
};
