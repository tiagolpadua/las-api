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

  //   app.post("/usuarios", (req, res, next) => {
  //     const usuarios = req.body;
  //     //Usuario.adicionar(usuarios, res, next);
  //     Usuario.adicionar(usuarios)
  //       .then((resultados) => res.json({ id: resultados.insertId, ...usuarios }))
  //       .catch((erros) => next(erros));
  //   });

  //   app.put("/usuarios/:id", (req, res, next) => {
  //     const id = parseInt(req.params.id);
  //     const valores = req.body;
  //     //Usuario.alterar(id, valores, res, next);
  //     Usuario.alterar(id, valores)
  //       .then(() => res.json({ id, ...valores }))
  //       .catch((erros) => next(erros));
  //   });

  //   app.delete("/usuarios/:id", (req, res, next) => {
  //     const id = parseInt(req.params.id);
  //     //Usuario.excluir(id, res, next);
  //     Usuario.excluir(id)
  //       .then(() => res.json({ id }))
  //       .catch((erros) => next(erros));
  //   });

  //   app.get("/usuarios/nome/:nome", (req, res, next) => {
  //     const nome = req.params.nome;
  //     //Usuario.buscarPorNome(nome, res, next);
  //     Usuario.buscarPorNome(nome)
  //       .then((resultados) => res.json(resultados))
  //       .catch((erros) => next(erros));
  //   });
};
