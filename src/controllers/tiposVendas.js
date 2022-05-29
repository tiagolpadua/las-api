const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res, next) => {
    TiposVendas.listarTiposVendas()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.post("/tipos-vendas", (req, res, next) => {
    const tipoVenda = req.body;
    TiposVendas.adicionar(tipoVenda)
      .then((tipoVendaAdicionado) => res.status(201).json(tipoVendaAdicionado))
      .catch((erros) => next(erros));
  });

  //Refatoração - OK
  app.get("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    TiposVendas.buscaPorId(id)
    .then((tipoVenda) => (tipoVenda ? res.json(tipoVenda) : res.status(404).send()))
    .catch((erros) => next(erros));
  });

  //Refatoração - OK
  app.put("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    TiposVendas.alterar(id, valores)
    .then(() => res.json({ id, ...valores }))
    .catch((erros) => res.status(400).json(erros));
  });

  //Refatoração - OK
  app.delete("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    TiposVendas.excluir(id)
    .then(() => res.json({ id }))
    .catch((erros) => res.status(400).json(erros));

  });
};
