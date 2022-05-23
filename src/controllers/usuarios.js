const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res, next) => {
    Usuarios.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuario = req.body;
    Usuarios.adicionar(usuario)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then((resultados) => res.json(resultados))
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
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  //Dados pessoais

  app.get("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const { id } = req.params;
    Usuarios.buscarDadosPessoaisPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    const dadosPessoais = req.body;
    Usuarios.atualizarDadosPessoais(id, dadosPessoais)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  //Contatos

  app.get("/usuarios/:id/contatos", (req, res, next) => {
    const { id } = req.params;
    Usuarios.buscarContatosPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/contatos", (req, res, next) => {
    const id = parseInt(req.params.id);
    const contatos = req.body;
    Usuarios.atualizarContatos(id, contatos)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  //Senha

  app.put("/usuarios/:id/senha", (req, res, next) => {
    const id = parseInt(req.params.id);
    const senha = req.body;
    Usuarios.atualizarSenha(id, senha)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  //Endereco

  app.get("/usuarios/:id/endereco", (req, res, next) => {
    const { id } = req.params;
    Usuarios.buscarEnderecoPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/endereco", (req, res, next) => {
    const id = parseInt(req.params.id);
    const endereco = req.body;
    Usuarios.atualizarEndereco(id, endereco)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });
};
