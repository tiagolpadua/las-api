const query = require("../infraestrutura/database/queries");

class TiposVendas {
  listarTiposVendas() {
    const sql = "SELECT * FROM tiposVendas";
    return query(sql);
  }

  buscarPorIdTiposVendas(id) {
    const sql = "SELECT * FROM tiposVendas WHERE id = ?";
    return query(sql, id);
  }

  incluirTiposVendas(tipoVenda) {
    const sql = "INSERT INTO tiposVendas SET ?";
    return query(sql, tipoVenda);
  }

  alterarTiposVendas(id, valores) {
    const sql = "UPDATE tiposVendas SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }

  excluirTiposVendas(id) {
    const sql = "DELETE FROM tiposVendas WHERE id = ?";
    return query(sql, id);
  }
}

module.exports = new TiposVendas();
