const query = require("../infraestrutura/database/queries");

class Evento {
  adicionar(evento) {
    const sql = "INSERT INTO Eventos SET ?";
    return query(sql, evento);
  }

  listar() {
    const sql = "SELECT * FROM Eventos";
    return query(sql);
  }

  buscarPorId(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return query(sql, id);
  }

  alterar(id, eventoAlterado) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return query(sql, [eventoAlterado, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM Eventos WHERE id = ?";
    return query(sql, id);
  }

  buscaPorStatus(status) {
    const sql = "SELECT * FROM Eventos WHERE status like ?";
    return query(sql, status);
  }

  buscarPorNome(nome) {
    const sql = "SELECT * FROM Eventos WHERE nome like ?";
    return query(sql, nome);
  }
}

module.exports = new Evento();
