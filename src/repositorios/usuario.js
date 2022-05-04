const query = require("../infraestrutura/database/queries");

class Usuario{
    listar(){
        const sql = "SELECT * FROM Usuarios";
        return query(sql);
    }
}

module.exports = new Usuario();