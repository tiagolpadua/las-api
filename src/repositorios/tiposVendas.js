const query = require("../infraestrutura/database/queries");

class TiposVendas {
  adicionar(tipoVenda){
    const sql = "INSERT INTO TiposVendas SET ?";
    return query(sql, tipoVenda);
  }

  listar(){
    const sql = "SELECT * FROM TiposVendas";
    return query(sql);
  }

  listarPorId(id){
    const sql = "SELECT * FROM TiposVendas WHERE id = ?";
    return query(sql, id);
  }

  alterar(id, dadosAtualizado){
    const sql = "UPDATE TiposVendas SET ? WHERE id = ?";
    return query(sql, id, dadosAtualizado);
  }

  excluir(id){
    const sql = "DELETE FROM TiposVendas WHERE id = ?";
    return query(sql, id);
  }

}

module.exports = new TiposVendas();