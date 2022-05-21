const eventos = require("../models/eventos");

module.exports = (app) => {
    app.get("/eventos", (req, res, next) =>{
        eventos.listar()
        .then((resultados) => res.json(resultados))
        .catch((erros) => next(erros));//res.status(400).json(erros));
    });

    app.get("/eventos/:id", (req, res, next) =>{
        const id = parseInt(req.params.id);
        eventos.buscarPorId(id)
        .then((resultados) => res.json(resultados))
        .catch((erros) => next(erros));//res.status(400).json(erros));
    });

    app.post("/eventos", (req, res, next) => {
        const evento = req.body;
        eventos.adicionar(evento)
          .then((resultados) => res.json({ id: resultados.insertId, ...evento }))
          .catch((erros) => next(erros));//res.status(400).json(erros));
      });
    
      app.put("/eventos/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        eventos.alterar(id, valores)
          .then(() => res.json({ id, ...valores }))
          .catch((erros) => next(erros));//res.status(400).json(erros));
      });
    
      app.delete("/eventos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        eventos.excluir(id)
          .then(() => res.json({ id }))
          .catch((erros) => res.status(400).json(erros));
      });
};