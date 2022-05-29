const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuarios.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuarios = req.body;
    Usuarios.adicionarUsuario(usuarios)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/usuarios/:id/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.obterDadosPessoais(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
  app.put("/usuarios/:id/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.atualizarDadosPessoais(id, valores)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/usuarios/:id/contatos", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.obterContatos(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
  app.put("/usuarios/:id/contatos", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.atualizarContatos(id, valores)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/usuarios/:id/endereco", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.obterEndereco(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
  app.put("/usuarios/:id/endereco", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.atualizarEndereco(id, valores)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.put("/usuarios/:id/senha", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.atualizarSenha(id, valores)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
};
