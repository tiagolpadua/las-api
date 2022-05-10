const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res) =>
    TiposVendas.listar()
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => res.status(400).json(erros))
  );

  app.get("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);

    TiposVendas.buscarPorId(id)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.post("/tipos-vendas", (req, res) => {
    const tiposVenda = req.body;

    TiposVendas.incluir(tiposVenda)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.put("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    TiposVendas.alterar(id, valores)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.delete("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);

    TiposVendas.excluir(id)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
};
