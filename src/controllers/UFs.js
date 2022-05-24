const UFs = require("../models/UFs");

module.exports = (app) => {
  app.get("/ufs", (_req, res) => {
    UFs.buscaUfs()
      .then((results) => {
        if (!results.length) {
          res.status(404).json("UFS não encontrado");
        } else {
          res.status(200).json(results);
        }
      })
      .catch((erro) => {
        res
          .status(400)
          .json({ erro: erro.type, status: "UFS inválido fornecido" });
      });
  });

  app.get("/ufs/:uf/municipios", (req, res) => {
    const uf = req.params.uf;

    UFs.buscaMunicipiosUf(uf)
      .then((results) => {
        console.log(results);
        if (!results) {
          res.status(404).json("Municipio não encontrado");
        } else {
          res.status(200).json(results);
        }
      })
      .catch((erro) => {
        res.status(400).json("Id inválido fornecido");
        return erro.code;
      });
  });
};
