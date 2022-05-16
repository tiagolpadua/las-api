const query = require("../infraestrutura/database/queries");

class TipoVenda {
  adicionar(tipoVenda) {
    const sql = "INSERT INTO tiposvendas SET ?";
    return query(sql, tipoVenda);
  }

  listar() {
    const sql = "SELECT * FROM tiposvendas";
    return query(sql);
  }

  buscarPorId(id) {
    const sql = "SELECT * FROM tiposvendas WHERE id = ?";
    return query(sql, id);
  }

  alterar(id, tipoVendaAlterado) {
    const sql = "UPDATE tiposvendas SET ? WHERE id = ?";
    return query(sql, [tipoVendaAlterado, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM tiposvendas WHERE id = ?";
    return query(sql, id);
  }
}

module.exports = new TipoVenda();
