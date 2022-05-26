const query = require("../infraestrutura/database/queries");

class Usuario {
    listar() {
        const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios";
        return query(sql);
    }

    buscarPorId(id) {
        const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE id = ?";
        return query(sql, id)
            .then(resultado => resultado[0]);
    }
    adicionar({ nome, urlFotoPerfil }) {
        const sql = "INSERT INTO Usuarios SET ?";
        return query(sql, { nome, urlFotoPerfil });
    }
    alterar(valores, id) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql, [valores, id]);
    }
    excluir(id) {
        const sql = "DELETE FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }
    buscarPorNome(nome) {
        const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE nome like ?";
        return query(sql, "%" + nome + "%");
    }
    isNomeUsuarioUtilizado(nome) {
        const sql = "SELECT * FROM Usuarios WHERE nome = ?";
        return query(sql, nome).then((res) => {
            if (res.length > 0) {
                return true;
            } else {
                return false;
            }
        });
    }
    buscarDadosPessoais(id) {
        const sql = "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }
    buscarContatos(id) {
        const sql = "SELECT telefone, celular, email FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }
    buscarEndereco(id) {
        const sql = "SELECT cep, endereco, numero, complemento, bairro FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }
    alterarDadosPessoais(valores, id) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql, [valores, id]);
    }
    alterarContatos(valores, id) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql, [valores, id]);
    }
    alterarEndereco(valores, id) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql, [valores, id]);
    }
    alterarSenha(valores, id) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql, [valores, id]);
    }
}

module.exports = new Usuario();