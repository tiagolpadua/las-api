const query = require("../infraestrutura/database/queries");


class UF{

    listar(){
        const sql = "SELECT sigla FROM Uf";
        return query(sql);
    }

    buscarPorMunicipio(uf){
        uf = "%" + uf + "%";
        const sql = "SELECT nome FROM Municipio WHERE UF like ?";
        return query(sql, uf);
    }


}

module.exports = new UF();