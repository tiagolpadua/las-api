const TiposVenda = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req,res) => {
    TiposVenda
      .listar()
      .then((resuldados) => res.json(resuldados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.get("/tipos-vendas/:id", (req,res) => {
    const id = parseInt(req.params.id);
    
    TiposVenda
      .listarPorId(id)
      .then((resuldados) => res.json(resuldados))
      .catch((erros) => res.status(400).json(erros));
  });

  app.post("/tipos-vendas", (req,res) => {
    const tipoVenda = req.body;

    TiposVenda
      .adicionar(tipoVenda)
      .then((tipoVendaCadastrada) => res.json(tipoVendaCadastrada))
      .catch((erros) => res.status(400).json(erros));
  });

  app.put("/tipos-vendas/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizadosTiposVenda = req.body;

    TiposVenda
      .alterar(id, dadosAtualizadosTiposVenda)
      .then(() => res.json(id,dadosAtualizadosTiposVenda))
      .catch((erros) => res.status(400).json(erros));
  });

  app.delete("/tipos-vendas/:id", (req,res) => {
    const id = parseInt(req.params.id);

    TiposVenda
      .excluir(id)
      .then(() => res.json(`Tipo de Venda excluída: ${id}`))
      .catch((erros) => res.status(400).json(erros));
  });

};