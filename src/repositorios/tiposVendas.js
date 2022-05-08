const query = require("../infraestrutura/database/queries");

class TiposVendas {
  listarTipoVenda() {
    const sql = "SELECT * FROM las.tiposVendas";

    return query(sql);
  }

  buscaTipoVendaId(retornoId) {
    const sql = "SELECT * FROM las.tiposVendas WHERE id = ?";

    return query(sql, retornoId);
  }

  incluirTipoVenda(retornoForm) {
    const sql = "INSERT INTO las.tiposVendas SET ?";

    return query(sql, retornoForm);
  }

  alterarTipoVenda(id, retornoForm) {
    const sql = "UPDATE las.tiposVendas SET ? WHERE id = ?";
    return query(sql, [retornoForm, id]);
  }

  excluirTipoVenda(id) {
    const sql = "DELETE FROM las.tiposVendas WHERE id = ?";

    return query(sql, id);
  }
}

module.exports = new TiposVendas();
