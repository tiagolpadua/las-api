const Usuarios = require("../models/contatos");

module.exports = (app) => {
  app.get("/usuarios/:usuarioId/contatos", (req, res) => {
    const id = parseInt(req.params.usuarioId);

    Usuarios.buscaContatosId(id)
      .then((results) => {
        if (!results.length) {
          res.status(404).json("Contato não encontrado");
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

  app.put("/usuarios/:usuarioId/contatos", (req, res) => {
    const id = parseInt(req.params.usuarioId);
    const retornoForm = req.body;

    Usuarios.alterarContatos(id, retornoForm)
      // eslint-disable-next-line no-unused-vars
      .then((resultado) => {
        if (!resultado.affectedRows) {
          res.status(404).json("Contato não encontrado");
        } else {
          res.status(204).json({
            status: "Contato atualizado com sucesso",
          });
        }
      })
      .catch((erro) => {
        res.status(405).json({ erro: erro.code, status: "Entrada inválida" });
      });
  });

  app.put("/usuarios/:usuarioId/endereco", (req, res) => {
    const id = parseInt(req.params.usuarioId);
    const retornoForm = req.body;

    Usuarios.alterarContatos(id, retornoForm)
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
