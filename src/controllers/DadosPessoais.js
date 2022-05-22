const DadosPessoais = require("../models/DadosPessoais");

module.exports = (app) => {
  app.get("/usuarios/:usuarioId/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.usuarioId);

    DadosPessoais.buscaDadosPessoaisId(id)
      .then((results) => {
        if (!results.length) {
          res.status(404).json("Usuário não encontrado");
        } else {
          res.status(200).json({
            ...results[0],
            descrição: "Operação bem sucedida",
          });
        }
      })
      .catch((erro) => {
        res.status(400).json("Id inválido fornecido");
        return erro;
      });
  });

  app.put("/usuarios/:usuarioId/dados-pessoais", (req, res) => {
    const id = parseInt(req.params.usuarioId);
    const retornoForm = req.body;

    console.log("rota DADOS PESSOAIS", id, retornoForm);

    DadosPessoais.alterarDadosPessoais(id, retornoForm)
      // eslint-disable-next-line no-unused-vars
      .then(() => {
        res.status(201).json({
          status: "Usuário atualizado com sucesso",
        });
      })
      .catch((erro) => {
        res.status(405).json({ erro: erro, status: "Entrada inválida" });
      });
  });
};
