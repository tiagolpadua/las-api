const Usuario = require("../src/models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (_req, res) => {
    Usuario.lista(res);
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuario.buscaId(id, res);
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuario.buscaNome(nome, res);
  });

  app.post("/usuarios", (req, res) => {
    const usuario = req.body;
    const nome = req.body.nome;
    Usuario.validarNomeUsuarioNaoUtilizado(nome, res, usuario);
  });

  app.put("/usuarios/:id", (req, res) => {
    const usuario = req.body;
    const id = parseInt(req.params.id);
    Usuario.altera(id, usuario, res);
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuario.deleta(id, res);
  });
};
