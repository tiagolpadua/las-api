const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuario", (req, res) => {
    Usuario.buscaTodos(res);
  });

  app.get("/usuario/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuario.buscaPorId(id, res);
  });
};
