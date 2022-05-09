const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res, next) => {
    TiposVendas.listarTiposVendas()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.post("/tipos-vendas", (req, res, next) => {
    const usuarios = req.body;
    TiposVendas.adicionar(usuarios)
      .then((usuariosAdicionado) => res.status(201).json(usuariosAdicionado))
      .catch((erros) => next(erros));
  });

  //Refatoração - OK
  app.get("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    TiposVendas.buscarPorId(id)
      .then((resultado) => res.json(resultado))
      .catch((erros) => next(erros));
  });

  //Refatoração - OK
  app.put("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    TiposVendas.alterar(id, valores)
      .then((resultado) => res.json(resultado))
      .catch((erros) => next(erros));
  });

  //Refatoração - OK
  app.delete("/tipos-vendas/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    TiposVendas.excluir(id).catch((erros) => next(erros));
  });
};
