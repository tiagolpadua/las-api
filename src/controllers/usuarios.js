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
      if(resultados.length > 0){
      return res.json(resultados[0]);
      } else {
        return res.status(404).send();
      }
    })
    .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuario = req.body;
    Usuarios.adicionar(usuario)
    .then((resultados) => res.status(201).json(resultados))
    .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
    .then((resultados) => res.json(resultados))
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
      return res.json(resultados[0]);
      } else {
        return res.status(404).send();
      }
    })
    .catch((erros) => next(erros));
  });
};
