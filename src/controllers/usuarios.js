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

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((nome) => (nome ? res.json(nome) : res.status(404).end()))
      .catch((erros) => res.status(400).json(erros));
  });

  ///Atualização e consulta de dados pessoais

  app.get("/usuarios/:id/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.consultarDadosPessoais(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).end()))
      .catch((erros) => res.status(400).json(erros));
  });
  app.put("/usuarios/:id/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.id);
    const dadosPessoais = req.body;
    Usuarios.atualizaDadosPessoais(id, dadosPessoais)
      .then((resultados) =>
        resultados ? res.json(dadosPessoais) : res.status(400).end()
      )
      .catch((erros) => res.status(400).json(erros));
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
      .then((resultado) =>
        resultado ? res.status(200).json(resultado) : res.json(400).end()
      )
      .catch((erro) => res.status(400).json(erro));
  });

  app.put("/usuarios/:id/endereco", (req, res) => {
    const id = parseInt(req.params.id);
    const dadosEndereco = req.body;
    Usuarios.alterarEndereco(id, dadosEndereco)
      .then((resultado) =>
        resultado ? res.status(200).json(dadosEndereco) : res.json(400).end()
      )
      .catch((erro) => res.status(400).json(erro));
  });
};
