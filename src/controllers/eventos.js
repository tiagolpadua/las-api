const Eventos = require("../models/eventos");

module.exports = (app) => {
    app.get("/eventos", (req, res, next) => {
        Eventos.listar()
        .then((resultados) => res.json(resultados))
        .catch((erros) => next(erros));
      });

      app.get("/eventos/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        Eventos.buscarPorId(id)
        .then((resultado) => {
          if (resultado) {
            res.json(resultado);
          } else {
            res.status(404).end();
          }
        })
        .catch((erros) => next(erros));
      });

      app.put("/eventos/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        Eventos.alterar(valores, id)
        .then((resultado) => {
          if (resultado) {
            res.json(resultado);
          } else {
            res.status(404).end();
          }
        })
        .catch((erros) => next(erros));
      });
    
      app.delete("/eventos/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        Eventos.excluir(id)
        .then((resultados) => res.json(resultados))
        .catch((erros) => next(erros));
      });
};