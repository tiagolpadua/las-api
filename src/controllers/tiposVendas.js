const Venda = require("../models/tiposVendas");

module.exports = (app) => {
app.get("/tipos-vendas",(req, res, next) => {
    Venda.listar()
      .then((resultados) => res.json(resultados)).catch((erros) => next(erros));
  });  

  app.get("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Venda.buscarPorId(id)
    .then((venda) => (venda ? res.json(venda) : res.status(404).send())).catch((erros) => next(erros));
  });  

  app.post("/tipos-vendas", (req, res, next) => {
    const venda = req.body;
    Venda.adicionar(venda).then((resultados) => res.status(201).json(resultados)).catch((erros) => next(erros));
  });

  app.put("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Venda.alterar(id, valores, res, next);
  });

  app.delete("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Venda.excluir(id, res, next);
  });

  
};