const tiposVendas = require("../models/tipoVendas");

module.exports = (app) => {
    app.get("/tipos-vendas", (req, res) => {
        tiposVendas.listar()
        .then(resultados => res.json(resultados))
        .catch((erros) => res.status(400).json(erros));
    });
};