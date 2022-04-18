const express = require("express");
const consign = require("consign");
// const bodyParser = require("body-parser");

module.exports = () => {
  const app = express();

  app.set("json spaces", 4);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  consign({ verbose: true }).include("src/controllers").into(app);

  return app;
};
