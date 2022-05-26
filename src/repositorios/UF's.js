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

  buscaEstado(estado) {
    const sql = "SELECT estado FROM UFs WHERE estado = ?";
    return query(sql, estado);
  }
}

module.exports = new UFs();
