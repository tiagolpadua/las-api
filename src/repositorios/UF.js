const query = require("../infraestrutura/database/queries.js");

class UfRepositorio {
  listar() {
    const sql = "SELECT sigla FROM UFs";
    return query(sql)
    .then(respostas => respostas.map(res => res.sigla));
  }
}

module.exports = new UfRepositorio();
