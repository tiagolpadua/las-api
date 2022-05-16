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

  listarPorId(id){
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return query(sql, {id});
    // .then((resultados) => resultados[0])
  }

  listarPorStatus(status){
    const sql = "SELECT * FROM Eventos WHERE status = ?";
    return query(sql, status);
  }

  alterar(id, dadosAtualizados){
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return query(sql, [id, dadosAtualizados]);
  }

  excluir(id){
    const sql = "DELETE FROM Eventos WHERE id = ?";
    return query(sql, id);
  }

}

module.exports = new Eventos();