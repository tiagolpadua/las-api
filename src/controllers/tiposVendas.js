const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res, next) =>
    TiposVendas.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros))
  );

  app.get("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);

    TiposVendas.buscarPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.post("/tipos-vendas", (req, res, next) => {
    const tiposVenda = req.body;

    TiposVendas.incluir(tiposVenda)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    TiposVendas.alterar(id, valores)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.delete("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);

    TiposVendas.excluir(id)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });
};
