const Eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res) => {
    Eventos.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(500).json(erros));
  });

  app.get("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Eventos.buscaPorId(id)
      .then((resultado) => {
        resultado ? res.json(resultado) : res.status(404).end();
      })
      .catch((erros) => res.status(500).json(erros));
  });

  app.get("/eventos/status/:status", (req, res) => {
    const status = req.params.status;

    Eventos.buscaPorStatus(status)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(404).json(erros));
  });

  app.post("/eventos", (req, res) => {
    const evento = req.body;
    Eventos.adicionar(evento)
      .then((resultados) =>
        res.status(201).json({ id: resultados.insertId, ...evento })
      )
      .catch((erros) => res.status(500).json(erros));
  });

  app.put("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Eventos.alterar(id, valores)
      .then((resultado) =>
        resultado.affectedRows !== 0
          ? res.json({ id, ...valores })
          : res.status(404).end()
      )
      .catch((erros) => res.status(500).json(erros));
  });

  app.delete("/eventos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Eventos.excluir(id)
      .then((resultado) =>
        resultado.affectedRows !== 0
          ? res.status(204).end()
          : res.status(404).end()
      )
      .catch((erros) => res.status(404).json(erros));
  });
};
