const query = require("../infraestrutura/database/queries");

class Eventos {
  listar() {
    const sql = "SELECT * FROM Eventos";
    return query(sql);
  }
  adicionar(evento) {
    const sql = "INSERT INTO Eventos SET ?";
    return query(sql, evento);
  }

  alterar(id, evento) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return query(sql, [id, evento]);
  }
  excluir(id) {
    const sql = "DELETE FROM Eventos WHERE id = ?";
    return query(sql, id);
  }
  buscaPorId(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return query(sql, id);
  }
  buscaPorNome(id, nome) {
    const sql = "SELECT * FROM Eventos WHERE nome like ?";
    return query(sql, id, nome);
  }
}

module.exports = new Eventos();
