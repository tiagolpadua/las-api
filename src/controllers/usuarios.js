const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuarios.listar()
      .then((usuarios) => res.status(200).json(usuarios))
      .catch((erro) => res.status(400).json(erro));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const novoUsuario = req.body;
    Usuarios.adicionar(novoUsuario)
      .then((usuario) => res.status(201).json(usuario))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then((usuario) => res.status(200).json(usuario))
      .catch((erro) => res.status(400).json(erro));
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
      .then((usuario) => res.status(200).json(usuario))
      .then((erro) => res.status(400).json(erro));
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((usuario) => res.status(200).json(usuario))
      .catch((erro) => res.status(400).json(erro));
  });

  ///Atualização e consulta de dados pessoais

  app.get("/usuarios/:id/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.consultarDadosPessoais(id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
  app.put("/usuarios/:id/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.id);
    const dadosPessoais = req.body;
    Usuarios.atualizaDadosPessoais(id, dadosPessoais)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erro) => res.status(400).json(erro));
  });

  //Atualização e consulta de contatos

  app.get("/usuarios/:id/contatos", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.consultaContatos(id)
      .then((resultados) => res.status(200).json(resultados))
      .catch((erro) => res.status(400).json(erro));
  });
  app.put("/usuarios/:id/contatos", (req, res) => {
    const id = parseInt(req.params.id);
    const dadosContatos = req.body;
    Usuarios.atualizarContatos(id, dadosContatos)
      .then((resultado) => res.status(200).json(resultado))
      .catch((erro) => res.status(400).json(erro));
  });

  //Atualização de senhas

  app.put("usuarios/:id/senha", (req, res) => {
    const id = parseInt(req.params.id);
    const key = req.body;
    Usuarios.alterarSenha(id, key)
      .then((resultado) => {
        if (resultado) {
          res.status(200).json({ resultado: "Senha alterada com sucesso" });
        } else {
          res.status(400).json({ resultado: "Entrada inválida" });
        }
      })
      .catch((erro) => res.status(400).json(erro));
  });

  //Inclusão e consulta de endereço

  app.get("/usuarios/:id/endereco", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.consultarEndereco(id)
      .then((resultado) => res.status(200).json(resultado))
      .catch((erro) => res.status(400).json(erro));
  });

  app.put("/usuarios/:id/endereco", (req, res) => {
    const id = parseInt(req.params.id);
    const dadosEndereco = req.body;
    Usuarios.alterarEndereco(id, dadosEndereco)
      .then((resultado) => res.status(200).json(resultado))
      .catch((erro) => res.status(400).json(erro));
  });
};
