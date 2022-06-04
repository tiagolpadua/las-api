const Eventos = require("../models/eventos");


module.exports = (app) => {
    app.get("/eventos", (req, res, next) => {
        Eventos.listar()
          .then((resultados) => res.json(resultados)).catch((erros) => next(erros));
      });

      app.get("/eventos/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        Eventos.buscarPorId(id)
          .then((resultado) => {
            if(resultado.length === 0) {
            return res.status(404).end();
          }
            return res.json(resultado[0]);
          })
          .catch((erros) => {
            return next(erros);
          });
      });
      
      app.get("/eventos/status/:status",(req,res,next) => {
        const status = req.params.status;
        Eventos.listarEventosPorStatus(status)
        .then((resultados) => res.json(resultados)).catch((erros) => next(erros));
      });

      app.post("/eventos", (req, res, next) => {
        const eventos = req.body;
        Eventos.incluir(eventos, res, next);
      });
    
      app.put("/eventos/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        Eventos.alterar(id, valores, res, next);
      });
    
      app.delete("/eventos/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        Eventos.excluir(id, res, next);
      });

      app.post("/eventos/nome", (req, res, next) => {
        const eventos = req.body;
        Eventos.incluir(eventos, res, next);
      });
};