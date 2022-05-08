const query = require("../infraestrutura/database/queries");

class Evento {
  listarEventos() {
    const sql = "SELECT * FROM Eventos";
    return query(sql);
  }

  buscarPorIdEvento(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return query(sql, id);
  }

  incluirEvento(evento) {
    const sql = "INSERT INTO Eventos SET ?";
    return query(sql, evento);
  }

  alterarEvento(id, valores) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }

  excluirEvento(id) {
    const sql = "DELETE FROM Eventos WHERE id = ?";
    return query(sql, id);
  }
}

module.exports = new Evento();
