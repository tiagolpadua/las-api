const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");

const ENV = process.env.NODE_ENV;

module.exports = () => {
  const TEXTO = "# LAS - Licenciamento de Ambulantes de Salvador";
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get("/", (requisicao, resposta) => {
    resposta.status(200).send(TEXTO);
  });

  consign().include("src/controllers").into(app);

  app.use((err, req, resposta) => {
    if (err) {
      if (ENV === "production") {
        resposta.status(500).send({ error: "Algo deu errado..." });
      } else {
        resposta.status(500).send({ error: err });
      }
      console.log(err);
    }
  });

  return app;
};
