const UFs = require("../models/ufs");

module.exports = (app) => {
  app.get("/ufs", (req, res, next) => {
    UFs.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/ufs/:uf/municipios", (req, res, next) => {
    const uf = req.params.uf;
    //Usuario.buscarPorNome(nome, res, next);
    UFs.buscarMunicipio(uf)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });
};
