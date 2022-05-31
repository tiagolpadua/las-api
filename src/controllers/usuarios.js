//const { json } = require("express/lib/response");
const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res, next) => {
    Usuarios.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuarios = req.body;
    Usuarios.adicionar(usuarios)
      .then((resultado) => res.status(201).json(resultado))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then((resultado) => res.json(resultado))
      .catch((erros) => next(erros));
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
      .then((resultado) => res.json(resultado))
      .catch((erros) => (erros));
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((resultado) => res.json(resultado))
      .catch((erros) => next(erros));
  });

  //dados-pessoais
  app.get("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.listarDadosPessoais(id)
      .then((resultado) => {
        if (resultado) {
          res.json(resultado[0]);
        } else {
          res.status(400).end();
        }
      })
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    const dadosPessoais = req.body;
    Usuarios.alterarDadosPessoais(id, dadosPessoais)
      .then((resultado) => {
        if (resultado) {
          res.status(204).json(resultado);
        } else {
          res.status(405).send({ Erro: "Entrada Inválida" });
        }
      })
      .catch((erros) => next(erros));
  });

  //contatos
  app.get("/usuarios/:id/contatos", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.listarContatos(id)
      .then((resultado) => res.json(resultado[0]))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/contatos", (req, res, next) => {
    const id = parseInt(req.params.id);
    const contatos = req.body;
    Usuarios.alterarContatos(id, contatos)
      .then((resultado) => {
        if (resultado) {
          res.status(204).json(resultado);
        } else {
          res.status(405).send({ erro: "Entrada Inválida" });
        }
      })
      .catch((erros) => next(erros));
  });

  //senha
  app.put("/usuarios/:id/senha", (req, res, next) => {
    const id = parseInt(req.params.id);
    const senha = req.body;
    Usuarios.alterarSenha(id, senha)
      .then((resultado) => res.status(204).json(resultado))
      .catch((erros) => next(erros));
  });

  //endereço
  app.get("/usuarios/:id/endereco", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.listarEndereco(id)
      .then((resultado) => res.json(resultado[0]))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/endereco", (req, res, next) => {
    const id = parseInt(req.params.id);
    const endereco = req.body;
    Usuarios.alterarEndereco(id, endereco)
      .then((resultado) => {
        if (resultado) {
          res.status(204).send(resultado);
        } else {
          res.status(405).send({ erro: "Entrada Inválida" });
        }
      })
      .catch((erros) => next(erros));
  });
};
