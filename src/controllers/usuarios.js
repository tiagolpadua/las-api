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
      .then((resultados) => res.status(200).json(resultados[0]))
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



  // dados pessoais
  app.get("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.listarDadosPessoais(id)
      .then((resultados) => res.status(200).json(resultados[0]))
      .catch((erros) => next(erros));
  });


  app.put("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterarDadosPessoais(valores, id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });


  // contatos

  app.get("/usuarios/:id/contatos", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.listarContatos(id)
      .then((resultados) => res.status(200).json(resultados[0]))
      .catch((erros) => next(erros));
  });


  app.put("/usuarios/:id/contatos", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterarContatos(valores, id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  // senha

  app.put("/usuarios/:id/senha", (req, res, next) => {
    const id = parseInt(req.params.id);
    const senha = req.body.senha;
    Usuarios.alterarSenha(senha, id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  // endereço

  app.get("/usuarios/:id/endereco", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.listarEndereco(id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/endereco", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterarEndereco(valores, id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

};
