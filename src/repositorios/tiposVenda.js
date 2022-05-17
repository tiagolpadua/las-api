const Queries = require("../infraestrutura/database/queries");

class TiposVendas {
    listar() {
        const sql = "SELECT * FROM TiposVendas";
        return Queries(sql);
    }

    buscarPorId(id) {
        const sql = "SELECT * FROM TiposVendas WHERE id = ?";
        return Queries(sql,id);
      }
    
      adicionar(venda) {
        const sql = "INSERT INTO TiposVendas SET ?";
       return   Queries(sql, venda);
       
      }
    
      alterar(id,valores) {
        const sql = "UPDATE TiposVendas SET ? WHERE id = ?";
        return Queries(sql,[valores,id]);
      }
    
      excluir(id) {
        const sql = "DELETE FROM TiposVendas WHERE id = ?";
        return Queries(sql, id);
      }
    
      buscarPorNome(nome) {
        const sql = "SELECT * FROM TiposVendas WHERE nome like ?";
        return Queries(sql, "%"+nome+"%");
      }
    
     
}



module.exports = new TiposVendas;