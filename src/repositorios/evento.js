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

  alterar(id, valores) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";

    return query(sql, [valores, id]);
  }

  buscaPorNome(nome) {
    const sql = "SELECT * FROM Eventos WHERE nome LIKE ?";

    return query(sql, `%${nome}%`);
  }

  excluir(id) {
    const sql = "DELETE FROM Eventos WHERE id = ?";

    return query(sql, id);
  }
}

module.exports = new Evento();
