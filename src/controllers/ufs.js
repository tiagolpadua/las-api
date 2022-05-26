const UFs = require("../models/ufs");

module.exports = (app) => {
  app.get("/ufs", (req, res) => {
    UFs.listar()
      .then((resultados) => {
        res.json(resultados);
      })
      .catch(() => {
        res.status(500).end();
      });
  });

  app.get("/ufs/:uf", (req, res) => {
    const uf = req.params.uf;

    UFs.buscarMunicipiosPorUf(uf)
      .then((resultados) => {
        res.json(resultados);
      })
      .catch(() => {
        res.status(404).end();
      });
  });
};
