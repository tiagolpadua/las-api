const query = require("../infraestrutura/database/queries");
const moment = require("moment");

class Eventos {
    listar(){
        const sql = "SELECT * FROM Eventos";
        return query(sql);
    }
    buscarPorId(id) {
        const sql = "SELECT * FROM Eventos WHERE id = ?";
        return query(sql, id);
    }
    adicionar(evento){
        const sql = "INSERT INTO Eventos SET ?";
        return query(sql, evento);
    }
    alterar(valores, id){
        const sql = "UPDATE Eventos SET ? WHERE id = ?";
        return query(sql, [valores, id]);
    }
    excluir(id){
        const sql = "DELETE FROM Eventos WHERE id = ?";
        return query(sql, id);
    }
    statusAgendado() {
        const dataHoje = moment().format("YYYY-MM-DD");
        const sql = "SELECT * FROM eventos WHERE dataInicio >= ?";
        return query(sql, dataHoje);
    }
    
    statusEmAndamento() {
        const dataHoje = {
          inicio: moment().startOf("day").format("YYYY-MM-DD"),
          fim: moment().endOf("day").format("YYYY-MM-DD"),
        };
        const sql = "SELECT * FROM eventos WHERE dataInicio <= ? AND dataFim >= ?";
        return query(sql, [dataHoje.inicio, dataHoje.fim]);
    }
    
    statusFinalizado() {
        const dataHoje = moment().format("YYYY-MM-DD");
        const sql = "SELECT * FROM eventos WHERE dataFim < ?";
        return query(sql, dataHoje);
    }
}

module.exports = new Eventos();