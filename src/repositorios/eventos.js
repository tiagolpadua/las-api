const query = require("../infraestrutura/database/queries");

class Evento {
  listarEventos() {
    const sql = "SELECT * FROM Eventos";
    return query(sql);
  }

  buscarPorIdEvento(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return query(sql, id);
  }
}

module.exports = new Evento();
