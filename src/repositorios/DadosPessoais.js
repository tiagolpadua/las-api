const query = require("../infraestrutura/database/queries");

//"nomeCompleto": "Fulano de Tal",
// "dataNascimento": {},
// "rg": "123321 SSP BA",
// "cpf": "12312312312"

class DadosPessoais {
  buscaDadosPessoaisId(retornoId) {
    const sql =
      "SELECT nomeCompleto, dataNascimento , rg, cpf, FROM las.usuarios WHERE id = ?";

    return query(sql, retornoId);
  }

  alterarDadosPessoais(id, retornoForm) {
    const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
    return query(sql, [retornoForm, id]);
  }
}

module.exports = new DadosPessoais();
