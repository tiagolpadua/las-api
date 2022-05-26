const uf = require("../models/uf");

module.exports = (app) => {
    
    app.get("/uf", (req, res) => {
        uf.listar(res)
          .then((resultados) => res.status(200).json(resultados))
          .catch((erros) => res.status(400).json(erros));
      });

    app.get("/uf/:UF", (req, res) => {
        const valor_uf = req.params.UF;
    
        uf.buscarPorMunicipio(valor_uf, res)
          .then((resultados) => res.json(resultados))
          .catch((erros) => res.status(400).json(erros));
    });
};