const Venda = require("../models/tiposVendas");

module.exports = (app) => {
app.get("/tipos-vendas",(req, res, next) => {
    Venda.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });  

  app.get("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Venda.buscarPorId(id, res, next);
  });  

  app.post("/tipos-vendas", (req, res, next) => {
    const venda = req.body;
    Venda.adicionar(venda, res, next);
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