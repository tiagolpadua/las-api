const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  //ok
  app.get("/usuarios", (req, res) => {
    Usuarios.listar(res)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  //ok
  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);

    Usuarios.buscarPorId(id, res)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  //ok
  app.post("/usuarios", (req, res) => {
    const usuarios = req.body;
    Usuarios.adicionar(usuarios)
      .then((resultado) =>res.status(200).json(resultado))
      .catch((erros) => res.status(400).json(erros));
      
  });

  //ok
  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then((resultado) => res.status(200).json(resultado))
      .catch((erros) => res.status(400).json(erros));
  });

  //ok
  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
      .then(() => res.json(id? { id } : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  //ok
  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  //ok
  app.get("/usuarios/:id/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.id);

    Usuarios.listarDadosPessoais(id, res)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  //ok
  app.put("/usuarios/:id/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterarDadosPessoais(id, valores)
      .then(() => res.status(200).json({ id, ...valores }))
      .catch((erros) => res.status(400).json(erros));
  });

  //ok
  app.get("/usuarios/:id/contatos", (req, res) => {
    const id = parseInt(req.params.id);

    Usuarios.listarContatos(id, res)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  //ok
  app.put("/usuarios/:id/contatos", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterarContatos(id, valores)
      .then(() => res.status(200).json({ id, ...valores }))
      .catch((erros) => res.status(400).json(erros));
  });

  //ok
  app.put("/usuarios/:id/senha", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterarSenha(id, valores)
      .then(() => res.status(200).json({ id, ...valores }))
      .catch((erros) => res.status(400).json(erros));
  });

  //ok
  app.get("/usuarios/:id/endereco", (req, res) => {
    const id = parseInt(req.params.id);

    Usuarios.listarEndereco(id, res)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  //ok
  app.put("/usuarios/:id/endereco", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterarEndereco(id, valores)
      .then(() => res.status(200).json({ id, ...valores }))
      .catch((erros) => res.status(400).json(erros));
  });
};
