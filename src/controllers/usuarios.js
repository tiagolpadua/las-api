const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuarios.listar()
      .then((usuarios) => res.status(200).json(usuarios))
      .catch((erro) => res.status(400).json(erro));
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((usuario) => res.status(200).json(usuario))
      .catch((erro) => res.status(400).json(erro));
  });

  app.post("/usuarios", (req, res) => {
    const novoUsuario = req.body;
    Usuarios.adicionar(novoUsuario)
      .then((usuario) => res.status(200).json(usuario))
      .catch((erro) => res.status(400).json(erro));
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then((usuario) => res.status(200).json(usuario))
      .catch((erro) => res.status(400).json(erro));
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
      .then((usuario) => res.status(200).json(usuario))
      .then((erro) => res.status(400).json(erro));
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((usuario) => res.status(200).json(usuario))
      .catch((erro) => res.status(400).json(erro));
  });
};
