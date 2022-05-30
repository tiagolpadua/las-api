const query = require("../infraestrutura/database/queries");

class UFs {
  listar() {
    const sql = "SELECT * FROM UFs ORDER BY cidade";
    return query(sql);
  }

  buscaCidade(cidade) {
    const sql = "SELECT cidade FROM UFs WHERE cidade = ?";
    return query(sql, cidade);
  }

  buscaSigla(sigla) {
    const sql = "SELECT * FROM UFs WHERE sigla = ?";
    return query(sql, sigla);
  }
}

module.exports = new UFs();
