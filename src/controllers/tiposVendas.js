const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res) =>
    TiposVendas.listar()
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => res.status(400).json(erros))
  );
};
