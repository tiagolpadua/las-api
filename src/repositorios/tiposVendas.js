const query = require("../infraestrutura/database/queries");

class TiposVendas {
    listar() {
        const sql = "SELECT * FROM tiposVendas";
        return query(sql);
    }

    buscarPorId(id) {
        const sql = "SELECT * FROM tiposVendas WHERE id = ?";
        return query(sql, id);
    }

    adicionar(tipoVenda) {
        const sql = "INSERT INTO tiposVendas SET ?";
        return query(sql, tipoVenda);
    }
    
    alterar(valores, id) {
        const sql = "UPDATE tiposVendas SET ? WHERE id = ?";
        return query(sql, [valores, id]);
    }

    excluir(id) {
        const sql = "DELETE FROM tiposVendas WHERE id = ?";
        return query(sql, id);
    }
}

module.exports = new TiposVendas();