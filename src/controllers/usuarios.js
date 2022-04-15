// const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    res.send(`usuário de id ${id}`);
  });
  app.get("/", (req, res) => {
    res.send("Olá Mundo!");
  });

  app.get("/usuarios", (req, res) => {
    res.send("Rota de atendimentos");
  });
};
