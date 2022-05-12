const query = require("../infraestrutura/database/queries");

class TiposVendas {
  listar() {
    const sql = "SELECT * FROM TipoVenda";

    return query(sql);
  }
}

module.exports = new TiposVendas();
