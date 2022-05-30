const tipoVenda = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (_req, res, next) => {
    tipoVenda.listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  app.post("/tipos-vendas", (req, res, next) => {
    const tipoVendaReq = req.body;
    tipoVenda.adicionar(tipoVendaReq)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    tipoVenda.buscaPorId(id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    tipoVenda.alterar(valores, id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  app.delete("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    tipoVenda.excluir(id)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });
};
