const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuario.buscaTodos(res);
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuario.buscaPorId(id, res);
  });
};
