const UFs = require("../models/ufs");

module.exports = (app) => {
    app.get("/ufs", (req, res, next) => {
        UFs.listar()
            .then((resultados) => res.json(resultados.map((uf) => uf.sigla)))
            .catch((erros) => next(erros));
    });
    app.get("/ufs/:uf/municipios", (req, res, next) => {
        const uf = req.params.uf;
        UFs.listarMunicipios(uf)
            .then((resultados) => res.json(resultados.map((municipio) => municipio.nome)))
            .catch((erros) => next(erros));
    });
};