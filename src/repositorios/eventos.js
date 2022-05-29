const query = require("../infraestrutura/database/queries");

class Eventos {
  listar() {
    const sql = "SELECT * FROM Eventos";
    return query(sql);
  }
  buscarPorId(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return query(sql, id);
  }
  adicionarEvento(evento) {
    const sql = "INSERT INTO Eventos SET ?";
    return query(sql, evento);
  }
  alterarId(id, novoId) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return query(sql, [novoId, id]);
  }
  excluirEvento(id) {
    const sql = "DELETE FROM Eventos WHERE id = ?";
    return query(sql, id);
  }
  buscarPorNome(nome) {
    const sql = "SELECT * FROM Eventos WHERE nome like ?";
    return query(sql, "%" + nome + "%");
  }
  buscaPorStatus(status) {
    const sql = "SELECT * FROM Eventos WHERE status = ?";
    return query(sql, status);
  }
}

module.exports = new Eventos();
