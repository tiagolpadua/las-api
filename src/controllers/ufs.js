const UFs = require("../models/ufs");

module.exports = (app) => {
  app.get("/ufs", (req,res) => {
    UFs
      .listar()
      .then((resuldados) => res.json(resuldados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/ufs/:uf", (req,res) => {
    const uf = req.params.uf;
    UFs
      .listarMunicipiosPorUf(uf)
      .then((resultado) => resultado ? res.json(resultado) : res.status(404).end())
      .catch((erros) => res.status(404).json(erros));
  });
};


