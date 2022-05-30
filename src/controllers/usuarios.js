const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res, next) => {
    Usuario.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    // Usuario.buscarPorId(id, res, next);
    Usuario.buscarPorId(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuarios = req.body;
    //Usuario.adicionar(usuarios, res, next);
    Usuario.adicionar(usuarios)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    //Usuario.alterar(id, valores, res, next);
    Usuario.alterar(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => next(erros));
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    //Usuario.excluir(id, res, next);
    Usuario.excluir(id)
      .then((id) => (id ? res.status(204).end() : res.status(404).end()))
      //.then(() => (id ? res.json({ id }) : res.status(404)))
      //.then(() => res.json({ id }))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    //Usuario.buscarPorNome(nome, res, next);
    Usuario.buscarPorNome(nome)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  //DADOS PESSOAIS
  app.get("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    // Usuario.buscarPorId(id, res, next);
    Usuario.obterDadosPessoais(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    //Usuario.alterar(id, valores, res, next);
    Usuario.atualizarDadosPessoais(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => next(erros));
  });

  //CONTATOS
  app.get("/usuarios/:id/contatos", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuario.buscarContatos(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/contatos", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuario.alterarContatos(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => next(erros));
  });

  //SENHA
  app.put("/usuarios/:id/senha", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuario.alterarContatos(id, valores)
      .then(() => res.json({ id, status: "senha alterada com sucesso." }))
      .catch((erros) => next(erros));
  });

  //ENDEREÇO

  app.get("/usuarios/:id/endereco", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuario.buscarEndereco(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/endereco", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuario.alterarEndereco(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => next(erros));
  });
};
