const query = require("../infraestrutura/database/queries");
// const TBase = require("../infraestrutura/database/base");

class tipoVenda {
  //   constructor() {
  //     this.myBase = TBase("tiposVendas");
  //   }

  listar() {
    const sql = "SELECT * FROM tiposVendas";
    // const sql = this.myBase.listar();

    // return query(this.myBase.listar());
    return query(sql);
  }

  adicionar(venda) {
    const sql = "INSERT INTO TiposVendas SET ?";

    return query(sql, venda);
  }

  buscaPorId(id) {
    const sql = "SELECT * FROM TiposVendas WHERE id = ?";

    return query(sql, id);
  }

  alterar(id, valores) {
    const sql = "UPDATE TiposVendas SET ? WHERE id = ?";

    return query(sql, [valores, id]);
  }

  buscaPorNome(nome) {
    const sql = "SELECT * FROM TiposVendas WHERE nome LIKE ?";

    return query(sql, `%${nome}%`);
  }

  excluir(id) {
    const sql = "DELETE FROM TiposVendas WHERE id = ?";

    return query(sql, id);
  }
}

module.exports = new tipoVenda();
