const Queries = require("../infraestrutura/database/queries");

class Usuarios {
    listar() {
        const sql = "SELECT * FROM Usuarios";
        return Queries(sql);
    }

    buscarPorId(id) {
        const sql = "SELECT * FROM Usuarios WHERE id = ?";
        return Queries(sql,id);
      }
    
      adicionar(usuario) {
        const sql = "INSERT INTO Usuarios SET ?";
       return   Queries(sql, usuario);
       
      }
    
      alterar(id, usuario) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return Queries(sql,[usuario,id]);
      }
    
      excluir(id) {
        const sql = "DELETE FROM Usuarios WHERE id = ?";
        return Queries(sql, id);
      }
    
      buscarPorNome(nome) {
        const sql = "SELECT * FROM Usuarios WHERE nome like ?";
        return Queries(sql, "%"+nome+"%");
      }
    
    
}



module.exports = new Usuarios;