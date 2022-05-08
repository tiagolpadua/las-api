const query = require("../infraestrutura/database/queries");

class TipoVenda{
    listar(){
    const sql = "SELECT * FROM TiposVendas";
    return query(sql);
    }
    buscarPorId(id) {
        const sql = "SELECT * FROM TiposVendas WHERE id = ?";
        return query(sql, id);
    }
    incluir(evento){
        const sql = "INSERT INTO TiposVendas SET ?";        
        return query(sql, evento);
    }
    alterar(id, valores) {
        const sql = "UPDATE TiposVendas SET ? WHERE id = ?";
        return query(sql, [valores,id]);
    }
    excluir(id) {
        const sql = "DELETE FROM TiposVendas WHERE id = ?";
        return query(sql, id);
    }
}

module.exports = new TipoVenda;