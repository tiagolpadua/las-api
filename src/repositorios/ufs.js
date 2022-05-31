const query = require("../infraestrutura/database/queries");

class UfsRepositorio {
  listar() {
    const sql = "SELECT * FROM  UFS";
    return query(sql);
  }
  buscarMunicipio(uf) {
    const sql = "SELECT * FROM MUNICIPIOS where siglaEstado = ?";
    return query(sql, uf);
  }
}

module.exports = new UfsRepositorio();
