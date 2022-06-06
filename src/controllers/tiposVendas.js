const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res) => {
    TiposVendas.listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
  app.get("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    TiposVendas.buscarPorId(id)
      .then((resultado) =>
        resultado ? res.status(200).json(resultado) : res.status(400).end()
      )
      .catch((erros) => next(erros));
  });
  app.post("/tipos-vendas", (req, res) => {
    const tipoVenda = req.body;
    TiposVendas.incluir(tipoVenda)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => res.status(404).json(erros));
  });

  app.put("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    TiposVendas.alterar(id, valores)
      .then((resultado) =>
        resultado
          ? res.status(200).json({ id, ...valores })
          : res.status(400).end()
      )
      .catch((erro) => next(erro));
  });

  app.delete("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    TiposVendas.excluir(id)
      .then((resultado) =>
        resultado ? res.status(200).json(resultado) : res.status(400).end()
      )
      .catch((erros) => next(erros));
  });
};
