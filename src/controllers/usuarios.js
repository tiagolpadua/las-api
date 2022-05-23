const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuarios.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).end()))
      .catch((erros) => res.status(404).json(erros));
  });

  app.post("/usuarios", (req, res) => {
    const usuarios = req.body;
    Usuarios.adicionar(usuarios)
      .then((resultados) => res.status(201).json(resultados))
      .catch((erros) => res.status(404).json(erros));
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then((resultados) =>
        resultados ? res.json({ id, ...valores }) : res.status(404).end()
      )
      .catch((erros) => res.status(404).json(erros));
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
      .then((resposta) =>
        resposta ? res.status(204).end() : res.status(404).end()
      )
      .catch((erros) => res.status(404).json(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(404).json(erros));
  });

  // DADOS PESSOAIS

  app.get("/usuarios/:usuarioId/dados-pessoais", (req, res) => {
    const id = req.params.usuarioId;
    Usuarios.buscarDadosPessoais(id)
      .then((resultado) => res.json(resultado))
      .catch((erros) => res.status(402).json(erros));
  });

  app.put("/usuarios/:usuarioId/dados-pessoais", (req, res) => {
    const id = req.params.usuarioId;
    const valores = req.body;
    Usuarios.atualizarDadosPessoais(id, valores)
      .then((resultados) =>
        resultados ? res.json(valores) : res.status(404).end()
      )
      .catch((erros) => res.status(402).json(erros));
  });
};
