const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res, next) => {
    Usuario.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuario.buscarPorId(id, res, next);
  });

  app.post("/usuarios", (req, res, next) => {
    const usuarios = req.body;
    Usuario.adicionar(usuarios, res, next);
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuario.alterar(id, valores, res, next);
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuario.excluir(id, res, next);
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuario.buscarPorNome(nome, res, next);
  });
};
