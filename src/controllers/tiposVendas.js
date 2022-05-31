const TiposVenda = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-venda", (req,res) => {
    TiposVenda
      .listar()
      .then((resuldados) => res.json(resuldados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/tipos-venda/:id", (req,res) => {
    const id = parseInt(req.params.id);
    
    TiposVenda
      .listarPorId(id)
      .then((usuario) => usuario ? res.json(usuario) : res.status(404).end())
      .catch((erros) => res.status(500).json(erros));
  });

  app.post("/tipos-venda", (req,res) => {
    const tipoVenda = req.body;

    TiposVenda
      .adicionar(tipoVenda)
      .then((resposta) => res.status(201).json(resposta))
      .catch((erros) => res.status(404).json(erros));
  });

  app.put("/tipos-venda/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizadosTiposVenda = req.body;

    TiposVenda
      .alterar(id, dadosAtualizadosTiposVenda)
      .then((resultado) => resultado ? res.json(resultado) : res.status(404).end())
      .catch((erros) => res.status(404).json(erros));
  });

  app.delete("/tipos-venda/:id", (req,res) => {
    const id = parseInt(req.params.id);

    TiposVenda
      .excluir(id)
      .then((resposta) => resposta ? res.status(204).end() : res.status(404).send())
      .catch((erros) => res.status(500).json(erros));
  });

};