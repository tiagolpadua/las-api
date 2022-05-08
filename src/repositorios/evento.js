const query = require("../infraestrutura/database/queries");

class Eventos{
    listar(){
    const sql = "SELECT * FROM Eventos";
    return query(sql);
    }
    buscarPorId(id) {
        const sql = "SELECT * FROM Eventos WHERE id = ?";
        return query(sql, id);
    }
    incluir(evento){
        const sql = "INSERT INTO Eventos SET ?";        
        return query(sql, evento);
    }
    alterar(id, valores) {
        const sql = "UPDATE Eventos SET ? WHERE id = ?";
        return query(sql, [valores,id]);
    }
    excluir(id) {
        const sql = "DELETE FROM Eventos WHERE id = ?";
        return query(sql, id);
    }
    buscaPorStatus(status) {
        const sql = "SELECT * FROM Eventos WHERE status like ?";
        return query(sql, `% ${status} %`);
      } 
}

module.exports = new Eventos;