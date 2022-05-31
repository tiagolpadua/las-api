const UFs = require("../models/UFs");

module.exports = (app) => {
  app.get("/ufs", (_req, res, next) => {
    UFs.listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/ufs/:uf/municipios", (req, res, next) => {
    const uf = req.params.uf;
    UFs.listarMunicipios(uf)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });
};
