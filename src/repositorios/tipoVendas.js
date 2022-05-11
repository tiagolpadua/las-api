const query = require("../infraestrutura/database/queries.js");

class TipoVendasRepositorio {
  listar() {
    const sql = "SELECT * FROM tipoVendas";
    return query(sql);
  }

}

module.exports = new TipoVendasRepositorio();