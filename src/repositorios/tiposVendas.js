const query = require("../infraestrutura/database/queries");

class TiposVendas {
  listar() {
    const sql = "SELECT * FROM TipoVenda";

    return query(sql);
  }
  buscaPorId(id) {
    const sql = "SELECT * FROM TipoVenda WHERE id = ?";

    return query(sql, id);
  }

  incluir(TipoDeVenda) {
    const sql = "INSERT INTO TipoVenda SET ?";

    return query(sql, TipoDeVenda);
  }

  alterar(id, valores) {
    const sql = "UPDATE TipoVenda SET ? WHERE id = ?";

    return query(sql, [valores, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM TipoVenda WHERE id= ?";

    return query(sql, id);
  }
}

module.exports = new TiposVendas();
