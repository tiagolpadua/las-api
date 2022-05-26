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

  app.get("/ufs/:estado", (req, res) => {
    const estado = req.params.estado;
    UFs.buscaEstado(estado)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
};
