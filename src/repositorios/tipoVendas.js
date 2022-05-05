const query = require("../infraestrutura/database/queries");

class TiposVendas{
    listar(){
        const sql = "SELECT * FROM TiposVendas";
        return query(sql);
    }
}
module.exports = TiposVendas;