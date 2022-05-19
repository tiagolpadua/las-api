const Endereco = require("../models/endereco");

module.exports = (app) => {
  app.get("/usuarios/:usuarioId/endereco", (req, res) => {
    const id = parseInt(req.params.usuarioId);

    Endereco.buscaEnderecoId(id)
      .then((results) => {
        if (!Object.keys(results)) {
          res.status(404).json("Endereco não encontrado");
        } else {
          res.status(200).json({
            ...results[0],
            descrição: "Operação bem sucedida",
          });
        }
      })
      .catch((erro) => {
        res
          .status(400)
          .json({ erro: erro.type, status: "Id inválido fornecido" });
      });
  });

  app.put("/usuarios/:usuarioId/endereco", (req, res) => {
    const id = parseInt(req.params.usuarioId);
    const retornoForm = req.body;

    Endereco.alterarEndereco(id, retornoForm)
      // eslint-disable-next-line no-unused-vars
      .then((resultado) => {
        if (!resultado.affectedRows) {
          res.status(404).json("Endereço não encontrado");
        } else {
          res.status(204).json({
            status: "Endereço atualizado com sucesso",
          });
        }
      })
      .catch((erro) => {
        res.status(405).json({ erro: erro.code, status: "Entrada inválida" });
      });
  });
};
