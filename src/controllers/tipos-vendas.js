const tipoVendas = require("../models/tipos-vendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res, next) => {
    tipoVendas.listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });
};