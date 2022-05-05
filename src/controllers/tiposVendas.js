const tiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res, next) => {
    tiposVendas
      .listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    tiposVendas
      .buscaPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.post("/tipos-vendas", (req, res, next) => {
    const tipoVenda = req.body;
    tiposVendas
      .adicionar(tipoVenda, next)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    tiposVendas
      .alterar(id, valores)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.delete("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    tiposVendas
      .excluir(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });
};
