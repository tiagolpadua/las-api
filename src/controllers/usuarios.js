const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuarios.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(500).json(erros));
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).end()))
      .catch((erros) => res.status(500).json(erros));
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
        resultados.affectedRows !== 0
          ? res.json({ id, ...valores })
          : res.status(404).end()
      )
      .catch((erros) => res.status(500).json(erros));
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
      .then((resultado) =>
        resultado.affectedRows !== 0
          ? res.status(204).end()
          : res.status(404).end()
      )
      .catch((erros) => res.status(500).json(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((resultados) =>
        resultados ? res.json(resultados) : res.status(404).end()
      )
      .catch((erros) => res.status(404).json(erros));
  });

  // DADOS PESSOAIS

  app.get("/usuarios/:usuarioId/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.usuarioId);
    Usuarios.buscarDadosPessoais(id)
      .then((resultado) =>
        resultado ? res.json(resultado) : res.status(404).end()
      )
      .catch((erros) => res.status(500).json(erros));
  });

  app.put("/usuarios/:usuarioId/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.usuarioId);
    const valores = req.body;
    Usuarios.atualizarDadosPessoais(id, valores)
      .then((resultado) =>
        resultado.affectedRows !== 0 ? res.json(valores) : res.status(404).end()
      )
      .catch((erros) => res.status(404).json(erros));
  });

  // CONTATOS

  app.get("/usuarios/:usuarioId/contatos", (req, res) => {
    const id = parseInt(req.params.usuarioId);
    Usuarios.buscarContatos(id)
      .then((resultado) =>
        resultado ? res.json(resultado) : res.status(404).end()
      )
      .catch((erros) => res.status(404).json(erros));
  });

  app.put("/usuarios/:usuarioId/contatos", (req, res) => {
    const id = parseInt(req.params.usuarioId);
    const valores = req.body;
    Usuarios.atualizarContatos(id, valores)
      .then((resultado) =>
        resultado.affectedRows !== 0 ? res.json(valores) : res.status(404).end()
      )
      .catch((erros) => res.status(500).json(erros));
  });

  // SENHA

  app.put("/usuarios/:usuarioId/senha", (req, res) => {
    const id = parseInt(req.params.usuarioId);
    const valores = req.body;
    Usuarios.atualizarSenha(id, valores)
      .then((resultado) =>
        resultado.affectedRows !== 0 ? res.json(valores) : res.status(404).end()
      )
      .catch((erros) => res.status(500).json(erros));
  });

  // ENDEREÇO

  app.get("/usuarios/:usuarioId/endereco", (req, res) => {
    const id = parseInt(req.params.usuarioId);
    Usuarios.buscarEndereco(id)
      .then((resultado) =>
        resultado ? res.json(resultado) : res.status(404).end()
      )
      .catch((erros) => res.status(500).json(erros));
  });

  app.put("/usuarios/:usuarioId/endereco", (req, res) => {
    const id = parseInt(req.params.usuarioId);
    const valores = req.body;
    Usuarios.atualizarEndereco(id, valores)
      .then((resultados) =>
        resultados.affectedRows !== 0
          ? res.json(valores)
          : res.status(404).end()
      )
      .catch((erros) => res.status(500).json(erros));
  });
};
