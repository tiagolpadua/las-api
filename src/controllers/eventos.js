const eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res) => {
    eventos
      .listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
  app.get("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    eventos
      .buscarPorId(id)
      .then((evento) => (evento ? res.json(evento) : res.status(404).send()))
      .catch((erros) => next(erros));
  });
  app.post("/eventos", (req, res, next) => {
    const incluirEvento = req.body;
    eventos
      .adicionar(incluirEvento)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => next(erros));
  });

  app.put("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    eventos
      .alterar(id, valores)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => next(erros));
  });

  app.delete("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    eventos
      .excluir(id)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/eventos/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    eventos
      .buscarPorNome(nome)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
  app.get("/eventos/status/:status", (req, res) => {
    const status = req.params.status;
    eventos
      .buscaPorStatus(status)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
};
