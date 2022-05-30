const TipoVenda = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res, next) => {
    TipoVenda.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    // Usuario.buscarPorId(id, res, next);
    TipoVenda.buscarPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.post("/tipos-vendas", (req, res, next) => {
    const tiposVendas = req.body;
    //Usuario.adicionar(usuarios, res, next);
    TipoVenda.adicionar(tiposVendas)
      .then((resultados) =>
        res.status(201).json({ id: resultados.insertId, ...tiposVendas })
      )
      .catch((erros) => next(erros));
  });

  app.put("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    //Usuario.alterar(id, valores, res, next);
    TipoVenda.alterar(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => next(erros));
  });

  app.delete("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    //Usuario.excluir(id, res, next);
    TipoVenda.excluir(id)
      .then((resultado) =>
        resultado ? res.json({ id }).end() : res.stauts(204).end()
      )
      .catch((erros) => next(erros));
  });
};
