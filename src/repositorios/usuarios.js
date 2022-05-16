const query = require("../infraestrutura/database/queries");

class Usuario {

  adicionar(usuario){
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }

  listar(){
    const sql = "SELECT * FROM Usuarios";
    return query(sql);
  }

  listarPorId(id){
    const sql = "SELECT * FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  listarPorNome(nome){
    const sql = "SELECT * FROM Usuarios WHERE nome like ?";
    return query(sql, "%" + nome + "%");
  }

  alterar(id, dadosAtualizados){
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [id, dadosAtualizados]);
  }
  
  excluir(id){
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return query(sql,id);
  }

}

module.exports = new Usuario();