const query = require("../infraestrutura/database/queries");

class Evento {
  adicionar(evento) {
    const sql = "INSERT INTO Eventos SET ?";
    return query(sql, evento);
  }

  listaEventos() {
      const sql ="SELECT * FROM Eventos";
      return query(sql);
  }

  listaEventosPorStatus(status) {
    const sql =`SELECT * FROM Eventos WHERE status= "${status}"`;
    return query(sql);
    
  }
}

module.exports = new Evento();