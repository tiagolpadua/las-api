const query = require("../infraestrutura/database/queries");

class Usuario{
    listar(){
        const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios";
        return query(sql);
    }

    buscarPorId(id) {
        const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }
    adicionar({ nome, urlFotoPerfil }) {
        const sql = "INSERT INTO Usuarios SET ?";
        return query(sql, { nome, urlFotoPerfil });
    }
    alterar(valores, id){
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql, [valores, id]);
    }
    excluir(id){
        const sql = "DELETE FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }
    buscarPorNome(nome){
        const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE nome like ?";
        return query(sql, "%" + nome + "%");
    } 
}

module.exports = new Usuario();