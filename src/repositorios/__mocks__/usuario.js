// const query = require("../infraestrutura/database/queries");

const usuariosMock = require("./usuarios.json");
const usuariosDadosMock = require("./usuariosDados.json");

class Usuario {
    listar() {
        return Promise.resolve(usuariosMock);
    }

    buscarPorId(id) {
        return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
    }

    adicionar(usuario) {
        return Promise.resolve(usuario && { insertId: 99 });
    }

    isNomeUsuarioUtilizado(nome) {
        return Promise.resolve(!!usuariosMock.find((usuario) => usuario.nome === nome));
    }


    alterar(id) {
        return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
    }

    excluir(id) {
        return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
    }

    buscarPorNome(nome) {
        return Promise.resolve(usuariosMock.find((usuario) => usuario.nome === nome));
    }

    listarDadosPessoais(id) {
        return Promise.resolve(usuariosDadosMock.find((usuario) => usuario.id === id));
    }

    // alterarDadosPessoais(id, dadosPessoais) {
    //     const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    //     return query(sql, [dadosPessoais, id]);
    // };

    // listarContatos(id) {
    //     const sql = "SELECT telefone, celular, email FROM Usuarios WHERE ID = ?";
    //     return query(sql, id);
    // };

    // alterarContatos(id, contatos) {
    //     const sql = "UPDATE Usuarios SET ? WHERE id = ?"
    //     return query(sql, [contatos, id]);
    // };

    alterarSenha(valores, id) {
        if (valores.senha) {
            usuariosMock[id - 1].senha = valores.senha;
        }
        return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id))
            .then(({ senha }) => ({ senha }))
            .catch(() => undefined);
    }

    // listarEndereco(id) {
    //     const sql = "SELECT cep, endereco, numero, complemento, bairro FROM Usuarios WHERE id = ?";
    //     return query(sql, id);
    // };

    // alterarEndereco(id, endereco) {
    //     const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    //     return query(sql, [endereco, id]);
    // };
}

module.exports = new Usuario();