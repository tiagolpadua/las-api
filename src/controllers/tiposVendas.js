const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res) => {
    TiposVendas.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(500).json(erros));
  });

  app.get("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);

    TiposVendas.buscaPorId(id)
      .then((resultado) =>
        resultado ? res.json(resultado) : res.status(404).end()
      )
      .catch((erros) => res.status(404).json(erros));
  });

  app.post("/tipos-vendas", (req, res) => {
    const tipoVenda = req.body;
    TiposVendas.adicionar(tipoVenda)
      .then((resultado) => res.status(201).json(resultado))
      .catch((erros) => res.status(500).json(erros));
  });

  app.put("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    TiposVendas.alterar(id, valores)
      .then((resultado) =>
        resultado.affectedRows !== 0
          ? res.json({ id, ...valores })
          : res.status(404).end()
      )
      .catch((erros) => res.status(500).json(erros));
  });

  app.delete("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    TiposVendas.excluir(id)
      .then((resultado) =>
        resultado.affectedRows !== 0
          ? res.status(204).end()
          : res.status(404).end()
      )
      .catch((erros) => res.status(500).json(erros));
  });
};
