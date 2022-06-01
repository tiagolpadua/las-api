//const { status } = require("express/lib/response");
const query = require("../infraestrutura/database/queries");

class Evento {
  adicionar(evento) {
    const sql = "INSERT INTO Eventos SET ?";
    return query(sql, evento);
  }

  listarEventos() {
      const sql ="SELECT * FROM Eventos";
      return query(sql);
  }

  buscarPorId(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return query(sql,id);
  }

  listarEventosAgendados() {
    const sql = "SELECT * FROM Eventos WHERE dataInicio >= CURDATE()";
    return query(sql);
  }

  listarEventosEmAndamento() {
    const sql = "SELECT * FROM Eventos WHERE dataInicio <= CURDATE() and dataFim >= CURDATE()";
    return query(sql);
  }

  listarEventosFinalizados() {
    const sql = "SELECT * FROM Eventos WHERE dataFim < CURDATE()";
    return query(sql);
  }
 }

module.exports = new Evento();