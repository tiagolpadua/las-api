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

  buscaPorStatus(status) {
    const sql = "SELECT * FROM Eventos WHERE status = ?";
    return query(sql, status);
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
