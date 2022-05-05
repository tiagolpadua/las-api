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
    .then((resultado) => {
      if (resultado) {
        res.json(resultado);
      } else {
        res.status(404).end();
      }
    })
    .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuario = req.body;
    Usuarios.adicionar(usuario)
    .then(() => res.status(201).json(usuario))
    .catch((erros) => {
      if(erros[0] && 
        (erros[0].nome === "nome" || erros[0].nome === "urlFotoPerfil")){
        res.status(400).send(erros);
      } else {
        next(erros);
      }
    });
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(valores, id)
    .then((resultado) => {
      if (resultado) {
        res.json(resultado);
      } else {
        res.status(404).end();
      }
    })
    .catch((erros) => next(erros));
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
    .then((resultados) => res.json(resultados))
    .catch((erros) => next(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
    .then((resultados) => { 
      if(resultados.length > 0){
      return res.json(resultados);
      } else {
        return res.status(404).send();
      }
    })
    .catch((erros) => next(erros));
  });
};
