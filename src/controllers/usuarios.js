const Usuarios = require("../models/usuarios");
const valida = require("../models/validacoes.js");

module.exports = (app) => {
  app.get("/usuarios", (req, res, next) => {
    Usuarios.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((resultados) =>
        resultados.length > 0
          ? res.json(resultados[0])
          : res.status(404).json({})
      )
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((resultados) =>
        resultados.length > 0
          ? res.json(resultados[0])
          : res.status(404).json({})
      )
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id/endereco", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarEndereco(id)
      .then((resultados) =>
        resultados.length > 0
          ? res.json(resultados[0])
          : res.status(404).json({})
      )
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id/contatos", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarDadosContatos(id)
      .then((resultados) =>
        resultados.length > 0
          ? res.json(resultados[0])
          : res.status(404).json({})
      )
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarDadosPessoais(id)
      .then((resultados) =>
        resultados.length > 0
          ? res.json(resultados[0])
          : res.status(404).json({})
      )
      .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuario = req.body;
    Usuarios.adicionar(usuario)
      .then((resultados) => res.status(201).json(resultados[0]))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/contatos", (req, res, next) => {
    const id = parseInt(req.params.id);
    const campos = valida.putBodyContatos(req.body);
    Usuarios.alterarContatos(id, campos)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/senha", (req, res, next) => {
    const id = parseInt(req.params.id);
    const campos = valida.putBodySenha(req.body);
    Usuarios.alterarSenha(id, campos)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/endereco", (req, res, next) => {
    const id = parseInt(req.params.id);
    const camposValidos = valida.putBodyEndereco(req.body);
    Usuarios.alterarEndereco(id, camposValidos)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    const camposValidos = valida.putBodyDadosPessoais(req.body);
    Usuarios.alterarDadosPessoais(id, camposValidos)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
      .then((resultados) => res.status(204).json(resultados))
      .catch((erros) => next(erros));
  });
};
