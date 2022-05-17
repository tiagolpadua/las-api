const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res) => {
    TiposVendas.listarTipoVenda()
      .then((data) => res.status(200).json(data))
      .catch((erro) => res.status(400).json(erro.code));
  });

  app.get("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    TiposVendas.buscaTipoVendaId(id)
      .then((results) => {
        if (!results.length) {
          res.status(404).json("TiposVendas não encontrado");
        } else {
          res.status(200).json({
            ...results[0],
            descrição: "Operação bem sucedida",
          });
        }
      })
      .catch((erro) => {
        res.status(400).json("Id inválido fornecido");
        return erro.code;
      });
  });

  app.put("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const retornoForm = req.body;

    TiposVendas.alterarTipoVenda(id, retornoForm)
      .then(() => {
        res.status(204).json({
          status: "TiposVendas incluído com sucesso",
        });
      })
      .catch((erro) => {
        res.status(405).json({ erro, status: "Entrada inválida" });
      });
  });

  app.post("/tipos-vendas", (req, res) => {
    const retornoForm = req?.body;

    TiposVendas.incluirTipoVenda(retornoForm)
      .then((resultados) => {
        console.log(resultados.status);
        res.status(201).json({
          ...retornoForm,
          status: "Tipo de venda incluída com sucesso",
        });
      })
      .catch((erro) =>
        res.status(400).json({ erro, status: "Entrada inválida" })
      );
  });

  app.delete("/tipos-vendas/:id", (req, res) => {
    const id = parseInt(req.params.id);

    TiposVendas.excluirTipoVenda(id)
      .then((resultado) => {
        if (!resultado?.affectedRows)
          res.status(404).json("TipoVenda não encontrado");
        else res.status(204).json("TipoVenda excluído com sucesso");
      })
      .catch((erro) => {
        if (erro) res.status(400).json("Id inválido fornecido");
      });
  });
};
