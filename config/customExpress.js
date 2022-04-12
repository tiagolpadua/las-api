const express = require("express");
const consign = require("consign");

module.exports = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  consign({ cwd: "src" })
    .include("/infraestrutura/users/controllers")
    .into(app);

  return app;
};
