const express = require("express"); //lib instalada
const consign = require("consign"); //lib instalada
//const bodyParser = require("body-parser"); //lib instalada

module.exports = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  consign().include("./src/controllers").into(app);

  return app;
};
