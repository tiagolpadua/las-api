const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res, next) => {
    Usuarios.listar()
      .then((resultados) => res.json(resultados)).catch((erros) => next(erros));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuarios = req.body;
    Usuarios.adicionar(usuarios)
      .then((resultado) => res.status(201).json(resultado))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores, res, next);
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id, res, next);
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
    .then((resultados) => res.json(resultados)).catch((erros) => next(erros));
    
  });

  app.put("/usuarios/:id/dados-pessoais", async (req, res, next) => {
    try {
      const usuarioId = parseInt(req.params.id);
      const valores = req.body;
      await Usuarios.atualizaUsuarioId(usuarioId, valores);
      return res.status(204).json(valores);
    } catch (erro) {
      return next(erro);
    }
  });

  app.get("/usuarios/:usuarioId/dados-pessoais", async (req, res, next) => {
    try {
      const usuarioId = parseInt(req.params.usuarioId);
      const usuario = await Usuarios.obterUsuarioId(usuarioId);
      return res.status(200).json(usuario);
    } catch (erro) {
      return next(erro);
    }
  });

  app.get("/usuarios/:usuarioId/contatos", async (req, res, next) => {
    try {
      const usuarioId = parseInt(req.params.usuarioId);
      const usuario = await Usuarios.obterContatos(usuarioId);
      return res.status(200).json(usuario);
    } catch (erro) {
      return next(erro);
    }
  });

  app.put("/usuarios/:id/contatos", async (req, res, next) => {
    try {
      const usuarioId = parseInt(req.params.id);
      const valores = req.body;
      await Usuarios.atualizaContatoUsuarioId(usuarioId, valores);
      return res.status(204).json(valores);
    } catch (erro) {
      return next(erro);
    }
  });

  app.put("/usuarios/:id/senha", async (req, res, next) => {
    try {
      const usuarioId = parseInt(req.params.id);
      const valores = req.body;
      await Usuarios.senhaUsuarioId(usuarioId, valores);
      return res.status(204).json(valores);
    } catch (erro) {
      return next(erro);
    }
  });

  app.get("/usuarios/:usuarioId/endereco", async (req, res, next) => {
    try {
      const usuarioId = parseInt(req.params.usuarioId);
      const usuario = await Usuarios.obterEndereco(usuarioId);
      return res.status(200).json(usuario);
    } catch (erro) {
      return next(erro);
    }
  });

  app.put("/usuarios/:id/endereco", async (req, res, next) => {
    try {
      const usuarioId = parseInt(req.params.id);
      const valores = req.body;
      await Usuarios.atualizaEnderecoUsuarioId(usuarioId, valores);
      return res.status(204).json(valores);
    } catch (erro) {
      return next(erro);
    }
  });
};
