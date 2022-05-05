const eventos = require("../models/eventos");

module.exports = (app) => {
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
};