const query = require("../infraestrutura/database/queries");

class Usuario {
    listar() {
        const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios";
        return query(sql);
    }

    buscarPorId(id) {
        const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE id = ?";
        return query(sql, id).then((data) => data[0]);
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
        const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE nome like ?";
        return query(sql, "%" + nome + "%");
    }

    listarDadosPessoais(id) {
        const sql = "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }

    alterarDadosPessoais(id, dadosPessoais) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql, [dadosPessoais, id]);
    }

    listarContatos(id) {
        const sql = "SELECT telefone, celular, email FROM Usuarios WHERE ID = ?";
        return query(sql, id);
    }

    alterarContatos(id, contatos) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql, [contatos, id]);
    }

    alterarSenha(id, senha) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql, [senha, id]);
    }

    listarEndereco(id) {
        const sql = "SELECT cep, endereco, numero, complemento, bairro FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }

    alterarEndereco(id, endereco) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql, [endereco, id]);
    }

    isNomeUsuarioUtilizado(nome) {
        const sql = "SELECT * FROM Usuarios WHERE nome = ?";
        return query(sql, nome).then((data) => {
            if (data.length > 0) {
                return true;
            } else {
                return false;
            }
        });
    }
}

module.exports = new Usuario();