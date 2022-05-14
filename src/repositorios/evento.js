const query = require("../infraestrutura/database/queries.js");
class EventoRepositorio {
  listar() {
    const sql = "SELECT * FROM Eventos";
    return query(sql);
  }

  buscaPorId(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return query(sql, id);
  }

  adicionar(evento) {
    const sql = "INSERT INTO Eventos SET ?";
    return query(sql, evento);
  }

  alterar(valores, id) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM Eventos WHERE id = ?";
    return query(sql, id);
  }

  listarEventosAgendados() {
    const sql = "SELECT * FROM Eventos WHERE status = 'agendado' ";
    return query(sql);
  }

  listarEventosEmAndamento() {
    const sql = "SELECT * FROM Eventos WHERE status = 'em-andamento' ";
    return query(sql);
  }

  listarEventosFinalizados() {
    const sql = "SELECT * FROM Eventos WHERE status = 'finalizado' ";
    return query(sql);
  }
}

module.exports = new EventoRepositorio();
