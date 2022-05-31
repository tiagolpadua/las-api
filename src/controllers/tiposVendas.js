const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-venda", (req, res, next) => {
    TiposVendas.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/tipos-venda/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    TiposVendas.buscarPorId(id)
      .then((resultados) => res.json(resultados[0]))
      .catch((erros) => next(erros));
  });

  app.post("/tipos-venda", (req, res, next) => {
    const tipoVenda = req.body;
    TiposVendas.adicionar(tipoVenda)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/tipos-venda/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    TiposVendas.alterar(id, valores)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });

  app.delete("/tipos-venda/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    TiposVendas.excluir(id)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });
};
