//const atendimentos = require("../models/atendimentos");
const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuario.lista(res);
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
    const valores = req.body;

    Usuario.altera(id, valores, res);
  });

  //   app.delete("/atendimentos/:id", (req, res) => {
  //     const id = parseInt(req.params.id);

  //     Usuario.deleta(id, res);
  //   });
};
