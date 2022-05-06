const executaQuery = require("../infraestrutura/database/queries");

class EventosRepositorio {
  listar() {
    const sql = "SELECT * FROM Eventos";
    return executaQuery(sql);
  }

  buscarPorId(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return executaQuery(sql, id);
  }

  validarNome(nome) {
    const sql = "SELECT * FROM Eventos WHERe nome =?";
    return executaQuery(sql, nome);
  }

  async adicionar(evento) {
    const sql = "INSERT INTO Eventos SET ?";
    const resultados = await executaQuery(sql, evento);
    const id = resultados.insertId;
    return { ...evento, id };
  }

  buscarStatus(status) {
    const sql = "SELECT * FROM Eventos WHERE status like ?";
    return executaQuery(sql, "%" + status + "%");
  }

  alterar(id, valores) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return executaQuery(sql, [valores, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM Eventos WHERE id = ?";
    return executaQuery(sql, id);
  }
}

module.exports = new EventosRepositorio();
