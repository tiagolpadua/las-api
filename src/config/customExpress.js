const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");

const ENV = process.env.NODE_ENV;

module.exports = () => {
  const app = express();
  const TEXTO = "# LAS - Licenciamento de Ambulantes de Salvador";
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  consign().include("src/controllers").into(app);
  app.get("/", (requisicao, resposta) => {
    resposta.status(200).send(TEXTO);
  });
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err) {
      if (ENV === "production") {
        res.status(500).send({ error: "Algo deu errado..." });
      } else {
        res.status(500).send({ error: err });
      }
      console.log(err);
    }
  });

  return app;
};
