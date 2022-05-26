const usuariosMock = require("./usuarios");

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
    alterar(valores, id) {
        if (valores.nome) {
            usuariosMock[id - 1].nome = valores.nome;
        }
        return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
    }
    excluir(id) {
        const novaLista = usuariosMock.filter((usuario) => usuario.id !== id);
        return Promise.resolve(novaLista);
    }
    buscarPorNome(nome) {
        return Promise.resolve(usuariosMock.find((usuario) => usuario.nome === nome));
    }

}

module.exports = new Usuario();