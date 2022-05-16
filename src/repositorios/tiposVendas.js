const query = require("../infraestrutura/database/queries");

class TiposVendas {
  listar() {
    const sql = "SELECT * FROM Eventos";
    return query(sql);
  }
  buscarPorId(id) {
    const sql = "SELECT * FROM TiposVendas WHERE id = ?";
    return query(sql, id);
  }
  adicionarVenda(venda) {
    const sql = "INSERT INTO TiposVendas SET ?";
    return query(sql, venda);
  }
  alterarId(id, novoId) {
    const sql = "UPDATE TiposVendas SET ? WHERE id = ?";
    return query(sql, [novoId, id]);
  }
  excluirVenda(id) {
    const sql = "DELETE FROM TiposVendas WHERE id = ?";
    return query(sql, id);
  }
}

module.exports = new TiposVendas();
