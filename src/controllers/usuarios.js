const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.post("/usuarios", (req, res) => {
    const retornoForm = req.body;

    Usuario.incluirUsuarios(retornoForm, res);
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuario.buscaUsuario(id, res);
  });
};
