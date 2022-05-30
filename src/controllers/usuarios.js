const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuarios.listar()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.post("/usuarios", (req, res) => {
    const usuarios = req.body;
    Usuarios.adicionar(usuarios)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404)).end())
      .catch((erros) => res.status(400).json(erros));
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
      .then((resultados) =>
        resultados ? res.status(204).end() : res.status(404).end()
      )

      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).end()))
      .catch((erros) => res.status(404).json(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((nome) => (nome ? res.json(nome) : res.status(404).end()))
      .catch((erros) => res.status(400).json(erros));
  });

  //api dados pessoais
  app.get("/usuarios/:id/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.listaDadosPessoais(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).end()))
      .catch((erros) => res.status(400).json(erros));
  });

  app.put("/usuarios/:id/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then((resultados) =>
        resultados ? res.json(valores) : res.status(404).end()
      )
      .catch((erros) => res.status(405).json(erros));
  });

  //contatos
  app.get("/usuarios/:id/contatos", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.listaContatos(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.put("/usuarios/:id/contatos", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterarContatos(id, valores)
      .then((resultados) =>
        resultados ? res.json(valores) : res.status(404).end()
      )
      .catch((erros) => res.status(405).json(erros));
  });

  //endereço
  app.get("/usuarios/:id/endereco", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.listaEndereco(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.put("/usuarios/:id/endereco", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterarContatos(id, valores)
      .then((resultados) =>
        resultados ? res.json(valores) : res.status(404).end()
      )
      .catch((erros) => res.status(405).json(erros));
  });

  //senha
  app.put("usuarios/:id/senha", (req, res) => {
    const id = parseInt(req.params.id);
    const senha = req.body;
    Usuarios.alterarSenha(id, senha)
      .then((resultados) =>
        resultados ? res.json(senha) : res.status(404).end()
      )
      .catch((erros) => res.status(404).json(erros));
  });
};
