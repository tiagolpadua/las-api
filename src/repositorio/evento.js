const query = require("../infraestrutura/database/queries");

class Evento {
  listar() {
    const sql = "SELECT * FROM Eventos";
    return query(sql);
  }

  adicionar(evento) {
    const sql = "INSERT INTO Eventos SET ?";
    return query(sql, evento);
  }

  buscaPorId(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return query(sql, id);
  }

  buscarEventosAgendado() {
    const sql = "SELECT * FROM Eventos WHERE dataInicio > CURDATE()";
    return query(sql);
  }
  buscarEventosEmAndamento() {
    const sql =
      "SELECT * FROM Eventos WHERE dataInicio < CURDATE() && dataFim > CURDATE()";
    return query(sql);
  }
  buscarEventosFinalizado() {
    const sql = "SELECT * FROM Eventos WHERE dataFim < CURDATE()";
    return query(sql);
  }

  alterar(id, eventoAtualizado) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return query(sql, [eventoAtualizado, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM Eventos WHERE id = ?";
    return query(sql, id);
  }
}

module.exports = new Evento();
