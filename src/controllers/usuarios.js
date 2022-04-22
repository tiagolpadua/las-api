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

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuario.buscaPorNome(nome, res);
  });

  app.post("/usuarios", async (req, res) => {
    const usuario = req.body;

    const usuarioValido = await Usuario.validarNomeUsuarioNaoUtilizado(
      usuario.nome
    );

    if (usuarioValido?.length || usuarioValido === null) {
      return res.status(400).send("Nome de usuário já cadastrado.");
    }
    Usuario.adiciona(usuario, res);
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
};
