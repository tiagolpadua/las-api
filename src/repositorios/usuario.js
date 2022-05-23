const query = require("../infraestrutura/database/queries");

class Usuario {
    listar() {
        const sql = "SELECT * FROM Usuarios";
        return query(sql);
    }

    buscarPorId(id) {
        const sql = "SELECT * FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }

    adicionar({ nome, urlFotoPerfil }) {
        const sql = "INSERT INTO Usuarios SET ?";
        return query(sql, { nome, urlFotoPerfil });
    }

    alterar(id, valores) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql, [valores, id]);
    }

    excluir(id) {
        const sql = "DELETE FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }

    buscarPorNome(nome) {
        const sql = "SELECT * FROM Usuarios WHERE nome like ?";
        return query(sql, "%" + nome + "%");
    }

    listarDadosPessoais(id) {
        const sql = "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }
}

module.exports = new Usuario();