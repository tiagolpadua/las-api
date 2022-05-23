const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
    app.get("/tipos-vendas", (req, res, next) => {
        TiposVendas.listar()
            .then((resultados) => res.json(resultados))
            .catch((erros) => next(erros));
    });

    app.get("/tipos-vendas/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        TiposVendas.buscarPorId(id)
            .then((resultado) => {
                if (resultado) {
                    res.json(resultado);
                } else {
                    res.status(404).end();
                }
            })
            .catch((erros) => next(erros));
    });

    app.post("/tipos-vendas", (req, res, next) => {
        const tipoVenda = req.body;
        TiposVendas.adicionar(tipoVenda)
            .then((resultado) => {
                if (resultado) {
                    res.status(201).json(resultado);
                } else {
                    res.status(400).end();
                }
            })
            .catch((erros) => next(erros));
    });
    
    app.put("/tipos-vendas/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        TiposVendas.alterar(valores, id)
            .then(() => res.json({ id, ...valores }))
            .catch((erros) => next(erros));
    });

    app.delete("/tipos-vendas/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        TiposVendas.excluir(id)
            .then((resultado) => res.json(resultado))
            .catch((erros) => next(erros));
    });
};