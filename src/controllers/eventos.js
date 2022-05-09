const Eventos = require("../models/eventos");
module.exports = (app) => {
  app.get("/eventos", (res) => {
    Eventos.listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
};
