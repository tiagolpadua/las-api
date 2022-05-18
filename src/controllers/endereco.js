const Endereco = require("../models/endereco");

module.exports = (app) => {
  app.get("/usuarios/:usuarioId/endereco", (req, res) => {
    const id = parseInt(req.params.usuarioId);

    Endereco.buscaEnderecoId(id)
      .then((results) => {
        if (!Object.keys(results)) {
          res.status(404).json("Endereco não encontrado");
        } else {
          res.status(200).json({
            ...results[0],
            descrição: "Operação bem sucedida",
          });
        }
      })
      .catch((erro) => {
        res.status(400).json("Id inválido fornecido");
        return erro.code;
      });
  });

  app.get("/ufs", (req, res) => {
    Endereco.buscaUfs()
      .then((results) => {
        if (!results.length) {
          res.status(404).json("UFS não encontrado");
        } else {
          res.status(200).json(results);
        }
      })
      .catch((erro) => {
        res.status(400).json({ erro, status: "UFS inválido fornecido" });
        // return erro;
      });
  });

  app.get("/ufs/:uf/municipios", (req, res) => {
    const uf = req.params.uf;

    Endereco.buscaMunicipiosUf(uf)
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
