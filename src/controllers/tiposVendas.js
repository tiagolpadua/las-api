const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res, next) => {
    TiposVendas.listarTiposVendas()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });
};
