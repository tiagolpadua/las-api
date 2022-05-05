const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res, next) => {
    Usuarios.listar(res, next)
    .then(resultados => res.json(resultados))
    .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuarios.buscarPorId(id, res)
    .then(resultados => res.json(resultados))
    .catch((erros) => res.status(400).json(erros));
  });

  app.post("/usuarios", (req, res) => {
    const usuarios = req.body;

    Usuarios.adicionar(usuarios)
    .then(resultados => res.json({id: resultados.insertId, ...usuarios}))
    .catch((erros) => res.status(400).json(erros));
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
    .then(() => res.json({id, ...valores}))
    .catch((erros) => res.status(400).json(erros));
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
    .then(() => res.json({id}))
    .catch((erros) => res.status(400).json(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
    .then((resultados) => res.json(resultados))
    .catch((erros) => res.status(400).json(erros));
  });
};
