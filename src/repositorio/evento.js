const query = require("../infraestrutura/database/queries");

class Evento {
  listar() {
    const sql = "SELECT * FROM Eventos";
    return query(sql);
  }

  buscaPorId(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return query(sql, id);
  }
}

module.exports = new Evento();
