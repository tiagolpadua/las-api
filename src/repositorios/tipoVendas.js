const query = require("../infraestrutura/database/queries.js");

class TipoVendasRepositorio {
  listar() {
    const sql = "SELECT * FROM tipoVendas";
    return query(sql);
  }
  buscaPorId(id) {
    const sql = "SELECT * FROM tipoVendas WHERE id = ?";
    return query(sql, id);
  }
  adicionar(tipoVenda) {
    const sql = "INSERT INTO tipoVendas SET ?";
    return query(sql, tipoVenda);
  }
  alterar(valores, id) {
    const sql = "UPDATE tipoVendas SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }
  excluir(id) {
    const sql = "DELETE FROM tipoVendas WHERE id = ?";
    return query(sql, id);
  }
}

module.exports = new TipoVendasRepositorio();
