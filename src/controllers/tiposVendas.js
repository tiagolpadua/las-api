const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
    //ok
    app.get("/tipos-vendas", (req, res) => {
      TiposVendas.listar()
        .then(resultados => res.json(resultados))
        .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.get("/tipos-vendas/:id", (req, res) => {
        const id = parseInt(req.params.id);
    
        TiposVendas.buscaPorId(id)
        .then((resultado) => (resultado ? res.json(resultado) : res.status(404).send()))
          .catch((erros) => res.status(400).json(erros));
      });
    
    //ok
    app.post("/tipos-vendas", (req, res) => {
      const tipoVenda = req.body;

      TiposVendas.adicionar(tipoVenda)
        .then((resultados) => res.json({ id: resultados.insertId, ...tipoVenda }))
        .catch((erros) => res.status(400).json(erros));
    });
    
    //ok
    app.put("/tipos-vendas/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const valores = req.body;

      TiposVendas.alterar(id, valores)
        .then(() => res.json({ id, ...valores }))
        .catch((erros) => res.status(400).json(erros));
    });
    
    //ok
    app.delete("/tipos-vendas/:id", (req, res) => {
      const id = parseInt(req.params.id);
      
      TiposVendas.excluir(id)
        .then(() => res.json({ id }))
        .catch((erros) => res.status(400).json(erros));
    });
};