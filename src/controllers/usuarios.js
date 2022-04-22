const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuarios.buscaPorId(id, res);
  });
};
