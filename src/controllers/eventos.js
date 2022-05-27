const eventos = require("../models/eventos");

module.exports = (app) => {
    //ok
    app.get("/eventos", (req, res) =>{
        eventos.listar(res)
        .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.get("/eventos/:id", (req, res) =>{
        const id = parseInt(req.params.id);
        eventos.buscarPorId(id)
        .then((resultados) => res.json(resultados))
        .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.post("/eventos", (req, res) => {
        const evento = req.body;
        eventos.adicionar(evento)
          .then((resultados) => res.json({ id: resultados.insertId, ...evento }))
          .catch((erros) => res.status(400).json(erros));
    });
    
    //ok
    app.put("/eventos/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const valores = req.body;
      eventos.alterar(id, valores)
        .then(() => res.json({ id, ...valores }))
        .catch((erros) => res.status(400).json(erros));
    });
    
    //ok
    app.delete("/eventos/:id", (req, res) => {
      const id = parseInt(req.params.id);
      eventos.excluir(id)
        .then(() => res.json({ id }))
        .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.get("/eventos/status/:status", (req, res) => {
      const status = req.params.status;
      eventos.listarPorStatus(status)
        .then((resultados) => res.json(resultados))
        .catch((erros) => res.status(400).json(erros));
    });
};