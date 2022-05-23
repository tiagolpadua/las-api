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
      .then((resultados) => {
        if (resultados) {
          res.json(resultados);
        } else {
          res.status(404).end();
        }
      })
      .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuarios = req.body;
    console.log(usuarios);
    Usuarios.adicionar(usuarios)
      .then((resultado) => res.status(201).json(resultado))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then((resultado) => {
        if (resultado) {
          res.json({id, ...valores});
        } else {
          res.status(404).end();
        }
      })
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

  app.get("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.listarDadosPessoais(id)
      .then((resultado) => {
        resultado = resultado[0];
        if (resultado) {
          res.json(resultado);
        } else {
          res.status(400).end();
        }
      })
      .catch((erros) => next(erros));
  });
};
