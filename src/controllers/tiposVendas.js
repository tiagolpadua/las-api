const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res) => {
    TiposVendas.listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erro) => res.status(400).json(erro));
  });
  app.get("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    TiposVendas.detalhar(id)
      .then((tipoVenda) => res.status(200).json(tipoVenda))
      .catch((erro) => res.status(400).json(erro));
  });
  app.post("/tipos-vendas", (req, res) => {
    const tipoVenda = req.body;
    TiposVendas.incluir(tipoVenda)
      .then((tipoVenda) => res.status(200).json(tipoVenda))
      .catch((erro) => res.status(400).json(erro));
  });
  app.put("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    TiposVendas.alterar(id, valores)
      .then((tipoVenda) => res.status(200).json(tipoVenda))
      .catch((erro) => res.status(400).json(erro));
  });

  app.delete("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    TiposVendas.excluir(id)
      .then((tipoVenda) => res.status(200).json(tipoVenda))
      .then((erro) => res.status(400).json(erro));
  });
};
