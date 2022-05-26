const UFs = require("../models/UFs");

module.exports = (app) => {
  app.get("/ufs", (_req, res) => {
    UFs.buscaUfs()
      .then((results) => res.status(200).json(results))
      .catch((erro) => res.status(400).json(erro.code));
  });

  app.get("/ufs/:uf/municipios", (req, res) => {
    const uf = req.params.uf;

    UFs.buscaMunicipiosUf(uf)
      .then((results) => res.status(200).json(results))
      .catch((erro) => {
        res.status(400).json({ erro: erro, status: "Id inválido fornecido" });
      });
  });
};
