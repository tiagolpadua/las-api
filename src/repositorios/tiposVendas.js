const executaQuery = require("../infraestrutura/database/queries");

class TiposVendasRepositorio {
  listar() {
    const sql = "SELECT * FROM TiposVendas";
    return executaQuery(sql);
  }

  buscarPorId(id) {
    const sql = "SELECT * FROM TiposVendas WHERE id = ?";
    return executaQuery(sql, id);
  }

  adicionar(tipoVenda) {
    const sql = "INSERT INTO TiposVendas SET ?";
    return executaQuery(sql, tipoVenda);
  }

  alterar(id, valores) {
    const sql = "UPDATE TiposVendas SET ? WHERE id = ?";
    return executaQuery(sql, [valores, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM TiposVendas WHERE id = ?";
    return executaQuery(sql, id);
  }
}

module.exports = new TiposVendasRepositorio();
