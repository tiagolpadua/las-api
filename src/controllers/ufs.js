const UFs = require("../models/ufs");

module.exports = (app) => {
    app.get("/ufs", (req, res, next) => {
        UFs.listar()
            .then((resultados) => res.json(resultados.map((uf) => uf.sigla)))
            .catch((erros) => next(erros));
    });

    app.post("/ufs", (req, res, next) => {
        const uf = req.body;
        UFs.adicionar(uf)
            .then((resultado) => res.json(resultado))
            .catch((erros) => next(erros));
    });
};