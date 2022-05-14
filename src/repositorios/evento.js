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

  listarPorStatus(status) {
    const sql = "SELECT * FROM Eventos WHERE status = ?";
    return query(sql, status);
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
}

module.exports = new EventoRepositorio();
