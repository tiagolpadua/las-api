const query = require("../infraestrutura/database/queries");

class Eventos {

  adicionar(evento){
    const sql = "INSERT INTO Eventos SET ?";
    return query(sql, evento);
  }

  listar(){
    const sql = "SELECT * FROM Eventos";
    return query(sql);
  }

  async listarPorId(id){
    const sql =  "SELECT * FROM Eventos WHERE id = ?";
    return query(sql,id).then((evento) => evento[0]);
  }

  async listarPorStatusAgendado(){
    const sql = "SELECT * FROM Eventos WHERE dataInicio > CURDATE()";
    return query(sql);
  }

  async listarPorStatusEmAndamento(){
    const sql = "SELECT * FROM Eventos WHERE dataInicio < CURDATE() and dataFim > CURDATE()";
    return query(sql);
  }

  async listarPorStatusFinalizado(){
    const sql = "SELECT * FROM Eventos WHERE dataFim < CURDATE()";
    return query(sql);
  }

  alterar(id, dadosAtualizados){
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return query(sql, [dadosAtualizados, id]);
  }

  excluir(id){
    const sql = "DELETE FROM Eventos WHERE id = ?";
    return query(sql, id);
  }

}

module.exports = new Eventos();