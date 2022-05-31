const Ufs = require("../models/ufs");
module.exports = (app) => {
  app.get("/ufs", (req, res, next) => {
    Ufs.listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });
  app.get("/ufs/:uf/municipios", (req, res, next) => {
    const uf = req.params.uf;
    Ufs.buscarMunicipio(uf)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => next(erros));
  });
};
