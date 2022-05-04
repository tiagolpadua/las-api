// const Eventos = require("../models/eventos");

// module.exports = (app) => {
//   app.get("/eventos", (req, res, next) => {
//     Eventos.listar()
//       .then((resultados) => res.json(resultados))
//       .catch((erros) => next(erros));
//   });
//   app.get("/eventos/:id", (req, res, next) => {
//     const id = parseInt(req.params.id);
//     Eventos.buscarPorId(id)
//       .then((resultados) => res.json(resultados))
//       .catch((erros) => next(erros));
//   });

//   app.post("/eventos", (req, res, next) => {
//     const usuarios = req.body;
//     Eventos.adicionar(usuarios, res, next);
//   });

//   app.put("/eventos/:id", (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const valores = req.body;
//     Eventos.alterar(id, valores)
//       .then((resultados) => res.json(resultados))
//       .catch((erros) => next(erros));
//   });

//   app.delete("/eventos/:id", (req, res, next) => {
//     const id = parseInt(req.params.id);
//     Eventos.excluir(id)
//       .then((resultados) => res.json(resultados))
//       .catch((erros) => next(erros));
//   });

//   app.get("/eventos/status/:status", (req, res, next) => {
//     const status = req.params.status;
//     Eventos.buscarPorNome(status)
//       .then((resultados) => res.json(resultados))
//       .catch((erros) => next(erros));
//   });
// };
