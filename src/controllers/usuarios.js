const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios/:id", (req, res) => {
    const id = req.params.id;

    Usuario.buscarUsuario(id, res);
  });
};
