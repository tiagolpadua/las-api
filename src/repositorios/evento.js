const query = require("../infraestrutura/database/queries");

class Evento {
  constructor() {
    this.sqlBusca = "SELECT * FROM Eventos";
    this.sqlBuscarStatus = `${this.sqlBusca} WHERE status =`; //"SELECT * FROM Eventos WHERE status =";
    this.sqlBuscarId = `${this.sqlBusca} WHERE id =`;
  }

  listar() {
    const sql = this.sqlBusca; //"SELECT * FROM Eventos";

    return query(sql);
  }

  adicionar(evento) {
    const sql = "INSERT INTO Eventos SET ?";

    return query(sql, evento);
  }

  buscaPorId(id) {
    const sql = `${this.sqlBuscarId} ?`; //"SELECT * FROM Eventos WHERE id = ?";

    return query(sql, id);
  }

  alterar(id, valores) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";

    return query(sql, [valores, id]);
  }

  buscaPorStatus(status) {
    //const sql = "SELECT * FROM Eventos WHERE status = ?";
    const sql = `${this.sqlBuscarStatus} '${status}'`;

    return query(sql, status);
  }

  listarEventosAgendados() {
    const statusEvento = "agendado";
    const sql = `${this.sqlBuscarStatus} '${statusEvento}'`;

    return query(sql);
  }

  listarEventosEmAndamento() {
    const statusEvento = "em-andamento";
    const sql = `${this.sqlBuscarStatus} '${statusEvento}'`;

    return query(sql);
  }

  listarEventosFinalizados() {
    const statusEvento = "finalizado";
    const sql = `${this.sqlBuscarStatus} '${statusEvento}'`;

    return query(sql);
  }

  excluir(id) {
    const sql = "DELETE FROM Eventos WHERE id = ?";

    return query(sql, id);
  }
}

module.exports = new Evento();
