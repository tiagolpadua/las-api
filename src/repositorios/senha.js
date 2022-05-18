const query = require("../infraestrutura/database/queries");

// {
//   "telefone": "6233311212",
//   "celular": "62998757575",
//   "email": "foobar@gmail.com"
// }
class Senha {
  alterarSenha(id, retornoForm) {
    const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
    return query(sql, [retornoForm, id]);
  }

  // inicio query de validação

  // fim query de validação
}

module.exports = new Senha();
