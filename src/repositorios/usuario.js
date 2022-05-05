const query = require("../infraestrutura/database/queries");

class Usuario{
    listar(){
        const sql = "SELECT * FROM Usuarios";
        return query(sql);
    }

    buscarPorId(id){
        const sql = "SELECT * FROM Usuarios WHERE id = ?";
        return query(sql,id);
    }

    adiciona(usuario){
        const sql = "INSERT INTO Usuarios WHERE SET = ?";
        return query(sql,usuario);
    }

    alterar(id, valores){
        const sql = "UPDATE Usuarios SET = ? WHERE id = ?";
        return query(sql,[valores,id]);
    }

    excluir(id){
        const sql = "DELETE * FROM Usuarios WHERE id = ?";
        return query(sql,id);
    }

    buscarPorNome(nome){
        nome = "%" + nome + "%";
        const sql = "SELECT * FROM Usuarios WHERE nome like ?";
        return query(sql, nome);
    }
    
}
module.exports = Usuario;