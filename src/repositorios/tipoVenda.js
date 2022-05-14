const executaQuery = require("../infraestrutura/database/queries");

class TipoVenda {
  listar() {
    const sql = "SELECT * FROM tipovenda";
    return executaQuery(sql);
  }
  listarPorId(id) {
    const sql = "SELECT * FROM tipovenda WHERE id = ?";
    return executaQuery(sql, id);
  }

  adicionar(tipoVenda) {
    const sql = "INSERT INTO tipovenda SET ?";
    return executaQuery(sql, tipoVenda);
  }

  alterar(id, tipoVenda) {
    const sql = "UPDATE tipovenda SET ?  WHERE id = ?";
    return executaQuery(sql, [tipoVenda, id]);
  }

  deletar(id) {
    const sql = "DELETE FROM tipovenda WHERE id = ?";
    return executaQuery(sql, id);
  }
}

module.exports = new TipoVenda();
