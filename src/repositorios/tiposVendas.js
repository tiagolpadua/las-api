const query = require("../infraestrutura/database/queries");

class TiposVendas {
    listar() {
        const sql = "SELECT * FROM tiposvendas";
        return query(sql);
    }
    buscarPorId(id) {
        const sql = "SELECT * FROM tiposvendas WHERE id = ?";
        return query(sql, id)
            .then(resultado => resultado[0]);
    }
    adicionar(tipoVenda) {
        const sql = "INSERT INTO tiposvendas SET ?";
        return query(sql, tipoVenda);
    }
    alterar(valores, id) {
        const sql = "UPDATE tiposvendas SET ? WHERE id = ?";
        return query(sql, [valores, id]);
    }
    excluir(id) {
        const sql = "DELETE FROM tiposvendas WHERE id = ?";
        return query(sql, id);
    }
}

module.exports = new TiposVendas();