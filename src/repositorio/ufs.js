const query = require("../infraestrutura/database/queries");

class Ufs {
  listar() {
    const sql = "SELECT sigla FROM UFs ORDER BY sigla";
    return query(sql);
  }

  buscarMunicipiosPorUf(uf) {
    const sql = "SELECT nome FROM Municipios WHERE uf_sigla = ?";
    return query(sql, uf);
  }
}

module.exports = new Ufs();
