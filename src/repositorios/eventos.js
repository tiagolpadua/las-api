const query = require("../infraestrutura/database/queries");

class Evento {
  listarEvento() {
    const sql = "SELECT * FROM las.evento";

    return query(sql);
  }

  buscaEventoId(retornoId) {
    const sql = "SELECT * FROM las.evento WHERE id = ?";

    return query(sql, retornoId);
  }

  incluirEvento(retornoForm) {
    const sql = "INSERT INTO las.evento SET ?";

    return query(sql, retornoForm);
  }

  alterarEvento(id, retornoForm) {
    const sql = "UPDATE las.evento SET ? WHERE id = ?";
    return query(sql, [retornoForm, id]);
  }

  excluirEvento(id) {
    const sql = "DELETE FROM las.evento WHERE id = ?";

    return query(sql, id);
  }

  listarEventosAgendados() {
    const sql = "SELECT * FROM las.evento WHERE dataInicio > CURDATE()";

    return query(sql);
  }

  listarEventosEmAndamento() {
    const sql =
      "SELECT * FROM las.evento WHERE dataInicio <= CURDATE() and dataFim >= CURDATE()";

    return query(sql);
  }

  listarEventosFinalizados() {
    const sql = "SELECT * FROM las.evento WHERE dataFim < CURDATE()";

    return query(sql);
  }

  // inicio query de validação

  validarNomeEventoNaoUtilizado(retornoForm) {
    const sql = "SELECT * FROM las.evento WHERE nome = ?";

    return query(sql, retornoForm);
  }

  validarNomeEventoNaoUtilizadoPUT(id, retornoForm) {
    const sql = "SELECT * FROM las.evento where not id = ? and nome = ?";

    return query(sql, [id, retornoForm]);
  }

  // fim query de validação
}

module.exports = new Evento();
