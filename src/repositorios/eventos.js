const queries = require("../infraestrutura/database/queries");

class Eventos {
  listarEventos() {
    const sql = "SELECT * FROM Eventos";
    return queries(sql);
  }
  detalharEvento(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return queries(sql, id);
  }
}

module.exports = new Eventos();
