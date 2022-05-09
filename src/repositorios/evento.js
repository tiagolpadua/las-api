const query = require("../infraestrutura/database/queries.js");
class EventoRepositorio {
  listar() {
    const sql = "SELECT * FROM Eventos";
    return query(sql);
  }
}

module.exports = new EventoRepositorio();
