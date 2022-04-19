const consign = require("consign");
const express = require("express");
const bodyParser = require("body-parser");

module.exports = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  consign().include("src/controllers").into(app);
  return app;
};
