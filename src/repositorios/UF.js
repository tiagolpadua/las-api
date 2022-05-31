const query = require("../infraestrutura/database/queries.js");

class UfRepositorio {
  listar() {
    const sql = "SELECT sigla FROM UFs";
    return query(sql)
    .then(respostas => respostas.map(res => res.sigla));
  }

  listarMunicipios(siglaUF) {
    const sql = "SELECT nome FROM Municipios WHERE siglaUF = ?";
    return query(sql, siglaUF)
    .then(respostas => respostas.map(res => res.nome));
  }
}

module.exports = new UfRepositorio();
