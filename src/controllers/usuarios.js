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
    const atendimento = req.body;

    Usuario.adiciona(atendimento, res);
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    Usuario.altera(id, valores, res);
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuario.deleta(id, res);
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;

    Usuario.buscaPorNome(nome, res);
  });
};
