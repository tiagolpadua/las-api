const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuarios.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.post("/usuarios", (req, res) => {
    const usuarios = req.body;
    Usuarios.adicionar(usuarios)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
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
};
