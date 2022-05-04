const query = require("../infraestrutura/database/queries");

class Usuario{
    listar(){
        const sql = "SELECT * FROM Usuarios";
        return query(sql);
    }

    buscarPorId(id) {
        const sql = "SELECT * FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }
}

module.exports = new Usuario();