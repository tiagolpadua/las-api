const query = require("../infraestrutura/database/queries");

class Evento{
    //ok
    listar(){
        const sql ="SELECT * FROM Eventos";
        return query(sql);
    }

    //ok
    buscarPorId(id){
        const sql ="SELECT * FROM Eventos WHERE id = ?";
        return query(sql,id).then((data)=> data[0]);
    }

    //ok
    adicionar(evento) {
        const sql = "INSERT INTO Eventos SET ?";
        return query(sql, evento);
    }

    //ok
    alterar(id, eventoAtualizado) {
        const sql = "UPDATE Eventos SET ? WHERE id = ?";
        return query(sql, [eventoAtualizado, id]);
    }
    
    //ok
    excluir(id) {
        const sql = "DELETE FROM Eventos WHERE id = ?";
        return query(sql, id);
    }

    //ok
    listarAgendado(){
        const sql ="SELECT * FROM Eventos WHERE dataInicio > CURDATE()";
        return query(sql);
    }

    //ok
    listarEmAndamento(){ 
        const sql ="SELECT * FROM Eventos WHERE dataInicio < CURDATE() && dataFim > CURDATE()";
        return query(sql);
    }

    //ok
    listarFinalizado(){
        const sql ="SELECT * FROM Eventos WHERE dataFim < CURDATE()";
        return query(sql);
    }
}
module.exports = new Evento();