const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios/:id", (req, res) => {
    const id = req.params.id;

    Usuario.buscaUsuario(id, res);
  });

  app.get("/usuarios", (req, res) => {
    Usuario.listaUsuarios(res);
  });

  app.post("/usuarios", (req, res) => {
    const usuario = req.body;
    Usuario.criaUsuario(usuario, res);
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = req.params.id;
    const valores = req.body;
    Usuario.alteraUsuario(id, valores, res);
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = req.params.id;
    Usuario.excluiUsuario(id, res);
  });
};
