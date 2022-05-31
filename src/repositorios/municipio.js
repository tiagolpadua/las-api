// https://servicodados.ibge.gov.br/api/v1/localidades/municipios

const query = require("../infraestrutura/database/queries");

class Municipio {
  buscarMunicipio(nomeUF) {
    const sql = "SELECT nome FROM Municipios WHERE uf_sigla = ?";
    return query(sql, nomeUF);
  }
}

module.exports = new Municipio();
