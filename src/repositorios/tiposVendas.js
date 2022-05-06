const query = require("../infraestrutura/database/queries");

class TiposVendas {
  listar() {
    const sql = "SELECT * FROM TiposVendas";
    return query(sql);
  }
  adicionar(venda) {
    const sql = "INSERT INTO TiposVendas SET ?";
    return query(sql, venda);
  }

  alterar(id, venda) {
    const sql = "UPDATE TiposVendas SET ? WHERE id = ?";
    return query(sql, [id, venda]);
  }
  excluir(id) {
    const sql = "DELETE FROM TiposVendas WHERE id = ?";
    return query(sql, id);
  }
  buscaPorId(id) {
    const sql = "SELECT * FROM TiposVendas WHERE id = ?";
    return query(sql, id);
  }
}

module.exports = new TiposVendas();
