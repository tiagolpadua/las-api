const query = require("../infraestrutura/database/queries");

class TiposVendas {
  listarTiposVendas() {
    const sql = "SELECT * FROM tiposVendas";
    return query(sql);
  }
}

module.exports = new TiposVendas();
