const queries = require("../infraestrutura/database/queries");

class TiposVendas {
  listar() {
    const sql = "SELECT * FROM TiposVendas";
    return queries(sql);
  }
}

module.exports = new TiposVendas();
