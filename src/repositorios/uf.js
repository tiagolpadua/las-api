const query = require("../infraestrutura/database/queries");

class UF {
  listar() {
    const sql = "SELECT sigla FROM ufs ORDER BY 1";
    return query(sql);
  }

  buscarMunicipio(nomeUF) {
    const sql = "SELECT nome FROM ufs WHERE nome like ?";
    return query(sql, nomeUF);
  }
}

module.exports = new UF();
