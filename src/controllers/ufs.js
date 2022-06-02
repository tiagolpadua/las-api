const UFs = require("../models/ufs");

module.exports = (app) => {
  app.get("/ufs", (_req, res) => {
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
        resultados.length
          ? res.json(resultados)
          : res.status(404).json({ message: "UF não encontrada" });
      })
      .catch(() => {
        res.status(500).end();
      });
  });
};
