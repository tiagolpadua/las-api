const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuario.buscaTodos(res);
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuario.buscaPorId(id, res);
  });

  app.post("/usuarios", (req, res) => {
    const usuario = req.body;

    Usuario.adiciona(usuario, res);
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuarioNovo = req.body;

    Usuario.atualiza(id, usuarioNovo, res);
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuario.deleta(id, res);
  });
};
