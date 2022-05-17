const Queries = require("../infraestrutura/database/queries");

class Eventos {
    listar() {
        const sql = "SELECT * FROM Eventos";
        return Queries(sql);
    }

    buscarPorId(id) {
        const sql = "SELECT * FROM Eventos WHERE id = ?";
        return Queries(sql,id);
      }
    
      adicionar(evento) {
        const sql = "INSERT INTO Eventos SET ?";
       return   Queries(sql, evento);
       
      }
    
      alterar(id, valores) {
        const sql = "UPDATE Eventos SET ? WHERE id = ?";
        return Queries(sql,[valores, id]);
      }
    
      excluir(id) {
        const sql = "DELETE FROM Eventos WHERE id = ?";
        return Queries(sql,id);
      }
    
      listarEventosAgendados() {
        const statusEvento = "agendado";
        const sql = "SELECT * FROM Eventos WHERE status = ?";
        return Queries(sql, statusEvento);
      }

      listarEventosEmAndamento() {
        const statusEvento = "em-andamento";
        const sql = "SELECT * FROM Eventos WHERE status = ?";
        return Queries(sql, statusEvento);
      }
    
      listarEventosFinalizados() {
        const statusEvento = "finalizados";
        const sql = "SELECT * FROM Eventos WHERE status = ?";
        return Queries(sql, statusEvento);
      }
      
}



module.exports = new Eventos;