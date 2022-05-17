const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res, next) => {
    Usuarios.listar(res, next);
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id, res, next);
  });

  app.post("/usuarios", (req, res, next) => {
    const usuarios = req.body;
    Usuarios.adicionar(usuarios).then((usuarioAdicionado)=>
      res.status(201).json(usuarioAdicionado)
    ).catch((erros)=> next(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
    .then((resultado)=> res.json(resultado))
    .catch((erros)=> next(erros));
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
    .then(()=>res.status(204).json("Usuario excluido com sucesso"))
    .catch((erros)=> next(erros));
  
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
    .then((resultado)=> res.json(resultado))
    .catch((erros)=> next(erros));
  });
};
