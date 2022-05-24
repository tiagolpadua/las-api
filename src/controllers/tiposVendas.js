const tiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res) => {
    tiposVendas
      .listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.post("/tipos-vendas", (req, res) => {
    const tiposVendasDadoRequest = req.body;
    tiposVendas
      .adicionar(tiposVendasDadoRequest)
      .then((resultados) =>
        res.json({ id: resultados.insertId, ...tiposVendasDadoRequest })
      )
      .catch((erros) => res.status(400).json(erros));
  });

  app.put("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    tiposVendas
      .alterar(id, valores)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.delete("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tiposVendas
      .excluir(id)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tiposVendas
      .buscarPorId(id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
};
