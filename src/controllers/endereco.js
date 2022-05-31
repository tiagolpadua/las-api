const Endereco = require("../models/endereco");

module.exports = (app) => {
  app.get("/ufs", (_req, res, next) => {
    Endereco.listarUFs()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/ufs/:uf/municipios", (req, res, next) => {
    const uf = req.params.uf;
    Endereco.listarMunicipios(uf)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });
};
