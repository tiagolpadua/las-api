const Vendas = require("../models/tiposVendas");

module.exports = (app) => {
app.get("/tipos-vendas",(req, res, next) => {
    Vendas.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });  

  app.get("/tiposVendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Vendas.buscarPorId(id, res, next);
  });  

};