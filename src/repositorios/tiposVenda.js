const query = require("../infraestrutura/database/queries");

class TiposVendas{
    //ok
    listar(){
        const sql = "SELECT * FROM TiposVendas";
        return query(sql);
    }

    //ok
    adicionar(tipoVenda) {
        const sql = "INSERT INTO TiposVendas SET ?";
        return query(sql, tipoVenda);
    }
    
    //ok
    buscaPorId(id) {
        const sql = "SELECT * FROM TiposVendas WHERE id = ?";
        return query(sql, id).then((data)=> data[0]);
    }
    
    //ok
    alterar(id, tipoVendaAtualizada) {
        const sql = "UPDATE TiposVendas SET ? WHERE id = ?";
        return query(sql, [tipoVendaAtualizada, id]);
    }
    
    //ok
    excluir(id) {
        const sql = "DELETE FROM TiposVendas WHERE id = ?";
        return query(sql, id);
    }
}
module.exports = new TiposVendas();