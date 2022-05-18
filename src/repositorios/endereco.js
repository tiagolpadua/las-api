const query = require("../infraestrutura/database/queries");

// {
//   "cep": "72980000",
//   "endereco": "Rua 123",
//   "numero": 23,
//   "complemento": "Apartamento 509",
//   "bairro": "Zona Norte"
// }

class Endereco {
  buscaEnderecoId(retornoId) {
    const sql =
      "SELECT cep, endereco , numero, complemento, bairro FROM las.usuarios WHERE id = ?";

    return query(sql, retornoId);
  }
}

module.exports = new Endereco();
