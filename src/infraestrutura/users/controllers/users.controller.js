const conn = require("../../../services/conexao");
const Tabelas = require("../../../models/Tabelas");
// exports.getById = (req, res) => {
//   UserModel.findById(req.params.userId).then((result) => {
//     res.status(200).send(result);
//   });
// };

module.exports = (app) => {
  const tabela = new Tabelas();

  app.get("/users", (req, res) => {
    tabela.listarUsuarios(res, conn);
  });

  app.get("/users/:id?", (req, res) => {
    tabela.buscarUsuariosPorId(req.params.id, res, conn);
  });
};
