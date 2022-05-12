const Usuarios = require("../models/usuarios");

module.exports = (app) => {

  app.get("/usuarios", (req, res, next) => {
    Usuarios.listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id", (req, res , next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next (erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuario = req.body;
    Usuarios.adicionar(usuario)
      .then((resultados) => res.status(200).json({id : resultados.insertId, ...usuario}))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(valores, id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });
};
