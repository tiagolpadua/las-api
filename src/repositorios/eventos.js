const executaQuery = require("../infraestrutura/database/queries");

class Eventos {
  listar() {
    const sql = "SELECT * FROM Eventos";
    return executaQuery(sql);
  }

  buscarPorId(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return executaQuery(sql, id);
  }

  adicionar(evento) {
    const sql = "INSERT INTO Eventos SET ?";
    return executaQuery(sql, evento);
  }

  deletar(id) {
    const sql = "DELETE FROM Eventos WHERE id = ?";
    return executaQuery(sql, id);
  }

  atualizar(evento, id) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return executaQuery(sql, [evento, id]);
  }

  listarEventoAgendados() {
    const sql = "SELECT * FROM Eventos WHERE dataInicio >= CURDATE();";
    return executaQuery(sql);
  }

  listarEventoEmAadamento() {
    const sql =
      "SELECT * FROM Eventos WHERE dataInicio <= CURDATE() and dataFim >= CURDATE();";
    return executaQuery(sql);
  }

  listarEventoFinalizado() {
    const sql = "SELECT * FROM Eventos WHERE dataFim < CURDATE();";
    return executaQuery(sql);
  }
}

module.exports = new Eventos();
