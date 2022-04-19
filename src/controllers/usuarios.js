const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (requisicao, resposta) => {
    Usuario.buscaCompleta(resposta);
  });

  app.get("/usuarios/:id", (requisicao, resposta) => {
    const id = parseInt(requisicao.params.id);

    Usuario.buscaId(id, resposta);
  });
  app.get("/usuarios/nome/:nome", (requisicao, resposta) => {
    const nome = requisicao.params.nome;

    Usuario.buscaNome(nome, resposta);
  });

  app.post("/usuarios", (requisicao, resposta) => {
    const usuario = requisicao.body;

    Usuario.addUsuario(usuario, resposta);
  });

  app.put("/usuarios/:id", (requisicao, resposta) => {
    const id = parseInt(requisicao.params.id);
    const usuarioNovo = requisicao.body;

    Usuario.atualizaUsuario(id, usuarioNovo, resposta);
  });

  app.delete("/usuarios/:id", (requisicao, resposta) => {
    const id = parseInt(requisicao.params.id);

    Usuario.excluiUsuario(id, resposta);
  });
};
