const consign = require("consign");
const express = require("express");

module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  consign().include("src/controllers").into(app);

  return app;
};
