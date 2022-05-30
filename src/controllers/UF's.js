const UFs = require("../models/UF's");

module.exports = (app) => {
  app.get("/ufs", (req, res) => {
    UFs.listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/ufs/:cidade", (req, res) => {
    const cidade = req.params.cidade;
    UFs.buscaCidade(cidade)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/ufs/:sigla", (req, res) => {
    const sigla = req.params.sigla;
    UFs.buscaSigla(sigla)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
};
