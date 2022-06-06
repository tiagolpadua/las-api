const queries = require("../infraestrutura/database/queries");

class Eventos {
  listarEventos() {
    const sql = "SELECT * FROM Eventos";
    return queries(sql);
  }
  detalharEvento(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return queries(sql, id);
  }
  incluirEvento(evento) {
    const sql = "INSERT INTO Eventos SET ?";
    return queries(sql, evento);
  }
  alterarEvento(id, valores) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return queries(sql, [id, valores]);
  }
  excluirEvento(id) {
    const sql = "DELETE FROM Eventos WHERE id = ?";
    return queries(sql, id);
  }
  listarEventosAgendados() {
    const sql = "SELECT * FROM Eventos WHERE dataInicio > CURDATE()";
    return queries(sql);
  }

  listarEventosEmAndamento() {
    const sql =
      "SELECT * FROM Eventos WHERE dataInicio < CURDATE() && dataFim > CURDATE()";
    return queries(sql);
  }

  listarEventosFinalizados() {
    const sql = "SELECT * FROM Eventos WHERE dataFim < CURDATE()";
    return queries(sql);
  }
}

module.exports = new Eventos();
