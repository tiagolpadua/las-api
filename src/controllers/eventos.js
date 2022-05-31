const Eventos = require("../models/eventos");

module.exports = (app) =>{
  app.get("/eventos", (req,res) => {
    Eventos
      .listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/eventos/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    Eventos
      .listarPorId(id)
      .then((resultado) => resultado ? res.json(resultado) : res.status(404).end())
      .catch((erros) => res.status(404).json(erros));
  });

  app.get("/eventos/status/:status", (req,res) => {
    const status = req.params.status;
    Eventos
      .listarPorStatus(status)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.post("/eventos", (req,res) => {
    const eventos = req.body;
    Eventos
      .adicionar(eventos)
      .then((eventoCadastrado) => res.status(201).json(eventoCadastrado))
      .catch((erros) => res.status(404).json(erros));
  });

  app.put("/eventos/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizadosEvento = req.body;
    Eventos
      .alterar(id,dadosAtualizadosEvento)
      .then((resposta) => resposta ? res.json(resposta) : res.status(404).send())
      .catch((erros) => res.status(404).json(erros));
  });

  app.delete("/eventos/:id", (req,res) => {
    const id = parseInt(req.params.id);
    Eventos
      .exclui(id)
      .then((evento) => evento ? res.status(204).end() : res.status(404).end())
      .catch((erros) => res.status(500).json(erros));
  });
};