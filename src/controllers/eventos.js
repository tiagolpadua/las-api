const eventos = require("../models/eventos");

module.exports = (app) => {
    app.get("/", (req, res) => res.send("Servidor rodando GET"));
    app.post("/", (req, res) => res.send("Servidor rodando POST"));

    app.get("/eventos", (req, res) =>{
        eventos.listar()
        .then((resultados) => res.json(resultados))
        .catch((erros) => res.status(400).json(erros));
    });

    app.get("/eventos/:id", (req, res) =>{
        const id = parseInt(req.params.id);
        eventos.buscarPorId(id)
        .then((resultados) => res.json(resultados))
        .catch((erros) => res.status(400).json(erros));
    });

    app.post("/eventos", (req, res) => {
        const evento = req.body;
        eventos.adicionar(evento)
          .then((resultados) => res.json({ id: resultados.insertId, ...evento }))
          .catch((erros) => res.status(400).json(erros));
      });
    
      app.put("/eventos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        eventos.alterar(id, valores)
          .then(() => res.json({ id, ...valores }))
          .catch((erros) => res.status(400).json(erros));
      });
    
      app.delete("/eventos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        eventos.excluir(id)
          .then(() => res.json({ id }))
          .catch((erros) => res.status(400).json(erros));
      });
};