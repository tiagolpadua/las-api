const query = require("../infraestrutura/database/queries");

class Vendas {
  adicionar(venda) {
    const sql = "INSERT INTO tiposvendas SET ?";
    return query(sql, venda);
  }

  listarVendas() {
      const sql ="SELECT * FROM tiposVendas";
      return query(sql);
  }
}

module.exports = new Vendas();