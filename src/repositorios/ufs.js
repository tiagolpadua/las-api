const query = require("../infraestrutura/database/queries");

class UFs {
    listar() {
        const sql = "SELECT sigla FROM UFs";
        return query(sql);
    }

    adicionar(uf) {
        const sql = "INSERT INTO UFs SET ?";
        return query(sql, uf);
    }
}

module.exports = new UFs();