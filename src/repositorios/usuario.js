const query = require("../infraestrutura/database/queries");

class Usuarios{
     listar(){
        const sql = "SELECT * FROM Usuarios";
        return query(sql);
    }
    buscarPorId(id) {
        const sql = "SELECT * FROM Usuarios WHERE id = ?";
        return query(sql, id);

    }
    alterar(id, valores) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql, [valores,id]);
    }
    excluir(id) {
        const sql = "DELETE FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }
    buscarPorNome(nome) {
        const sql = "SELECT * FROM Usuarios WHERE nome like ?";
        return query(sql, "%" + nome + "%" );
    }
    adicionar(usuario){
        const sql = "INSERT INTO Usuarios SET ?";
        return query(sql, usuario);
    }

}


module.exports = new Usuarios;