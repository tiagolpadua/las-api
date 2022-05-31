const query = require("../infraestrutura/database/queries");

class Endereco {
  listarUFs() {
    const sql = "SELECT * FROM ufs";
    return query(sql);
  }

  listarMunicipios(uf) {
    const sql = "SELECT * FROM Municipios WHERE uf = ?";
    return query(sql, uf);
  }
}

module.exports = new Endereco();
