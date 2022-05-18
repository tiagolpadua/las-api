const Usuarios = require("../models/senha");

module.exports = (app) => {
  app.put("/usuarios/:usuarioId/senha", (req, res) => {
    const id = parseInt(req.params.usuarioId);
    const retornoForm = req.body;

    Usuarios.alterarSenha(id, retornoForm)
      // eslint-disable-next-line no-unused-vars
      .then((resultado) => {
        if (!resultado.affectedRows) {
          res.status(404).json("Contato não encontrado");
        } else {
          res.status(204).json({
            status: "Senha atualizada com sucesso",
          });
        }
      })
      .catch((erro) => {
        res.status(405).json({ erro: erro.code, status: "Entrada inválida" });
      });
  });
};
