const query = require("../infraestrutura/database/queries");

class Venda {
  adicionar({id, descricao}) {
    const sql = "INSERT INTO tiposvendas SET ?";
    return query(sql, {id, descricao});
  }

  listar() {
      const sql ="SELECT * FROM tiposVendas";
      return query(sql);
  }
}

module.exports = new Venda();