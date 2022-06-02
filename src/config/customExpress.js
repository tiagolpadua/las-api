const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require("../swagger-config.json");

const ENV = process.env.NODE_ENV;

module.exports = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use("/api-docs", swaggerUi.serve);
  app.get("/api-docs", swaggerUi.setup(swaggerConfig));

  app.get("/", (req, res) => {
    res.send("Bem vindo ao las-api");
  });

  consign().include("src/controllers").into(app);

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err.erroApp) {
      res.status(400).send(err.erroApp);
    } else if (ENV !== "production") {
      res.status(500).send({ error: err.message });
    } else {
      res.status(500).send({ error: "Algo deu errado" });
    }
  });

  return app;
};
