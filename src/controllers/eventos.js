const Eventos = require("../models/eventos");
module.exports = (app) => {
  app.get("/eventos", (req, res, next) => {
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
};
