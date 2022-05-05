const query = require("../infraestrutura/database/queries");

class Evento{
    listar(){
        const sql ="SELECT * FROM Eventos";
        return query(sql);
    }

    buscarPorId(id){
        const sql ="SELECT * FROM Eventos WHERE id = ?";
        return query(sql,id);
    }
}
module.exports = Evento;