const query = require("../infraestrutura/database/queries");

// {
//   "telefone": "6233311212",
//   "celular": "62998757575",
//   "email": "foobar@gmail.com"
// }
class Contatos {
  buscaContatosId(retornoId) {
    const sql =
      "SELECT telefone, celular , email FROM las.usuarios WHERE id = ?";

    return query(sql, retornoId);
  }

  alterarContatos(id, retornoForm) {
    const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
    return query(sql, [retornoForm, id]);
  }

  // inicio query de validação

  // fim query de validação
}

module.exports = new Contatos();
