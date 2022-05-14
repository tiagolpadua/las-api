const TipoVenda = require("../models/tipovenda.js");

module.exports = (app) => {
  app.get("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    TipoVenda.listarPorId(id)
      .then((tipovenda) => res.json(tipovenda))
      .catch((erro) => next(erro));
  });

  app.get("/tipos-vendas", (req, res, next) => {
    TipoVenda.listar()
      .then((tipovenda) => res.json(tipovenda))
      .catch((erro) => next(erro));
  });

  app.post("/tipos-vendas", (req, res, next) => {
    const tipovenda = req.body;
    TipoVenda.adicionar(tipovenda)
      .then((tipovenda) => res.status(201).json(tipovenda))
      .catch((erro) => next(erro));
  });

  app.put("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const tipovenda = req.body;
    TipoVenda.atualizar(id, tipovenda)
      .then((tipovenda) => res.json(tipovenda))
      .catch((erro) => next(erro));
  });

  app.delete("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    TipoVenda.deletar(id)
      .then(() => res.json({ messsage: "evento deletado com sucesso." }))
      .catch((erro) => next(erro));
  });
};
