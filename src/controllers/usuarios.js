const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuarios
      .listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios
      .buscarPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuarios
      .buscarPorNome(nome)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.post("/usuarios", (req, res) => {
    const usuarios = req.body;
    Usuarios
      .adicionar(usuarios)
      .then(usuarioCadastrado => {res.status(201).json(usuarioCadastrado);})
      .catch(erros => res.status(400).json(erros));
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizadosUsuario = req.body;
    Usuarios
      .alterar(id, dadosAtualizadosUsuario)
      .then(() => res.json(id, dadosAtualizadosUsuario))
      .catch((erros) => res.status(400).json(erros));
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.params.nome;
    Usuarios
      .excluir(id)
      .then(() => res.json(`Usuário excluído: ${nome}`))
      .catch((erros) => res.status(400).json(erros));
  });
  
};
