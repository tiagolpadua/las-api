const query = require("../infraestrutura/database/queries");

class UFs {
    listar() {
        const sql = "SELECT sigla FROM UFs";
        return query(sql);

    }
    listarMunicipios(uf) {
        const sql = "SELECT nome FROM Municipios WHERE siglaEstado = ?";
        return query(sql, uf);
    }
}

module.exports = new UFs();