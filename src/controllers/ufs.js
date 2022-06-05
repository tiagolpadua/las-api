const UFs = require("../models/ufs");

module.exports = (app) => {
  app.get("/ufs", (req, res, next) => {
    UFs.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/ufs/:uf/municipios", (req, res, next) => {
    const uf = req.params.uf;
    UFs.buscarMunicipiosPorUf(uf)
      .then((resultado) =>
        resultado ? res.json(resultado) : res.status(404).send()
      )
      .catch((erros) => next(erros));
  });
};
