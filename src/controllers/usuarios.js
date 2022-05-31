const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuarios
      .listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios
      .buscarPorId(id)
      .then((usuario) => usuario ? res.json(usuario) : res.status(404).end())
      .catch((erros) => res.status(500).json(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuarios
      .buscarPorNome(nome)
      .then((usuario) => usuario ? res.json(usuario) : res.status(404).end())
      .catch((erros) => res.status(404).json(erros));
  });

  app.post("/usuarios", (req, res) => {
    const usuarios = req.body;
    Usuarios
      .adicionar(usuarios)
      .then((usuarioCadastrado) => res.status(201).json(usuarioCadastrado))
      .catch((erros) => res.status(404).json(erros));
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizadosUsuario = req.body;
    Usuarios
      .alterar(id,dadosAtualizadosUsuario)
      .then((usuario) => usuario ? res.json(usuario) : res.status(404).end())
      .catch((erros) => res.status(404).json(erros));
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios
      .excluir(id)
      .then((resposta) => resposta ? res.status(204).end() : res.status(404).send())
      .catch((erros) => res.status(500).json(erros));
  });


  // Dados Pessoais
  app.get("/usuarios/:id/dados-pessoais", (req,res) => {
    const id = parseInt(req.params.id);

    Usuarios
      .listarDadosPessoais(id)
      .then((resultados) => resultados ? res.json(resultados) : res.status(404).json())
      .catch((erros) => res.status(500).json(erros));
  });

  app.put("/usuarios/:id/dados-pessoais", (req,res) => {
    const id = parseInt(req.params.id);
    const dadosPessoaisAtualizados = req.body;

    Usuarios
    .alterarDadosPessoais(id, dadosPessoaisAtualizados)
    .then((resuldados) => resuldados.affectedRows !== 0 ? res.json({...dadosPessoaisAtualizados}) : res.status(404).end())
    .catch((erros) => res.status(500).json(erros));
  });


  // Contatos
  app.get("/usuarios/:id/contatos", (req,res) => {
    const id = parseInt(req.params.id);
    Usuarios
      .listarContatos(id)
      .then((resultados) => resultados ? res.json(resultados) : res.status(404).json())
      .catch((erros) => res.status(500).json(erros));
  });

  app.put("/usuarios/:id/contatos", (req,res) => {
    const id = parseInt(req.params.id);
    const dadosContatosAtualizados = req.body;

    Usuarios
      .alterarContatos(id, dadosContatosAtualizados)
      .then((resuldados) => resuldados.affectedRows !== 0 ? res.json({...dadosContatosAtualizados}) : res.status(404).end())
      .catch((erros) => res.status(500).json(erros));
  });


  // Senha  
  app.put("/usuarios/:id/senha", (req,res) => {
    const id = parseInt(req.params.id);
    const dadosSenhaAtualizada = req.body;

    Usuarios
      .alterarSenha(id, dadosSenhaAtualizada)
      .then((resuldados) => resuldados.affectedRows !== 0 ? res.json({...dadosSenhaAtualizada}) : res.status(404).end())
      .catch((erros) => res.status(400).json(erros));
  });


  // Endereço
  app.get("/usuarios/:id/endereco", (req, res) => {
    const id = parseInt(req.params.id);

    Usuarios
      .listarEndereco(id)
      .then((resultados) => resultados ? res.json(resultados) : res.status(404).json())
      .catch((erros) => res.json(erros));
  });

  app.put("/usuarios/:id/endereco", (req, res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizadosEndereco = req.body;

    Usuarios
      .alterarEndereco(id,dadosAtualizadosEndereco)
      .then((resuldados) => resuldados.affectedRows !== 0 ? res.json({...dadosAtualizadosEndereco}) : res.status(404).end())
      .catch((erros) => res.status(500).json(erros));
  });
};