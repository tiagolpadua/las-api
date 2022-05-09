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
    buscaPorStatus(status, dataAtual) {
        let sql;

        switch (status) {
          case "agendado":
            sql = `SELECT * FROM Eventos WHERE dataInicio > "${dataAtual}"`;
            break;
          case "em-andamento":
            sql = `SELECT * FROM Eventos WHERE dataInicio < "${dataAtual}" and dataFim >= "${dataAtual}"`;
            break;
          case "finalizado":
            sql = `SELECT * FROM Eventos WHERE dataInicio < "${dataAtual}" and dataFim < "${dataAtual}"`;
            break;
        }
        return query(sql);             
      } 
}

module.exports = new Eventos;