const queries = require("../infraestrutura/database/queries");

class TiposVendas {
  listar() {
    const sql = "SELECT * FROM TiposVendas";
    return queries(sql);
  }
  buscarPorId(id) {
    const sql = "SELECT * FROM TiposVendas WHERE id = ?";
    return queries(sql, id);
  }
  incluir(tipoVenda) {
    const sql = "INSERT INTO TiposVendas SET ?";
    return queries(sql, tipoVenda);
  }
  alterar(id, valores) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return queries(sql, [id, valores]);
  }
  excluir(id) {
    const sql = "DELETE FROM TiposVendas WHERE id = ?";
    return queries(sql, id);
  }
}

module.exports = new TiposVendas();
