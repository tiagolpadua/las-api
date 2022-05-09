const eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res) => {
    eventos
      .listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
  app.get("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    eventos
      .buscarPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
  app.post("/eventos", (req, res) => {
    const eventos = req.body;
    eventos
      .adicionar(eventos)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.put("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    eventos
      .alterar(id, valores)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.delete("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    eventos
      .excluir(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/eventos/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    eventos
      .buscarPorNome(nome)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
};
