const Usuario = require("../src/models/usuarios");

module.exports = (app) => {
  // app.get("/usuarios", (_req, res) => {
  //   res.send("GET");
  // });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuario.buscaId(id, res);
  });

  app.post("/usuarios", (req, res) => {
    const usuario = req.body;
    Usuario.adiciona(usuario, res);
  });

  // // });app.patch('/atendimentos/:id', (req, res) => {
  // //     const valores = req.body;
  // //     const id = parseInt(req.params.id);
  // //     Atendimento.altera(id, valores, res);
  // // });
  // // app.delete('/atendimentos/:id', (req, res) => {
  // //     const id = parseInt(req.params.id);
  // //     Atendimento.deleta(id, res);
  // // });
};
