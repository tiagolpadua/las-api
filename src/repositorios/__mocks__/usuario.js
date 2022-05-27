const usuariosMock = require("./usuarios");

class Usuario {
    listar() {
        return Promise.resolve(usuariosMock.map((usuario) => ({ id: usuario.id, nome: usuario.nome, urlFotoPerfil: usuario.urlFotoPerfil })));
    }
    buscarPorId(id) {
        return Promise.resolve(usuariosMock.find((usuario) => usuario?.id === id))
            .then(({ id, nome, urlFotoPerfil }) => ({ id, nome, urlFotoPerfil }))
            .catch(() => undefined);
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
        return Promise.resolve(novaLista.map((usuario) => ({ id: usuario.id, nome: usuario.nome, urlFotoPerfil: usuario.urlFotoPerfil })));
    }
    buscarPorNome(nome) {
        return Promise.resolve(usuariosMock.find((usuario) => usuario?.nome === nome))
            .then(({ id, nome, urlFotoPerfil }) => ({ id, nome, urlFotoPerfil }))
            .catch(() => undefined);
    }
    buscarDadosPessoais(id) {
        return Promise.resolve(usuariosMock.find((usuario) => usuario?.id === id))
            .then(({ nomeCompleto, dataNascimento, rg, cpf }) => ({ nomeCompleto, dataNascimento, rg, cpf }))
            .catch(() => undefined);
    }
    buscarContatos(id) {
        return Promise.resolve(usuariosMock.find((usuario) => usuario?.id === id))
            .then(({ telefone, celular, email }) => ({ telefone, celular, email }))
            .catch(() => undefined);
    }
    buscarEndereco(id) {
        return Promise.resolve(usuariosMock.find((usuario) => usuario?.id === id))
            .then(({ cep, endereco, numero, complemento, bairro }) => ({ cep, endereco, numero, complemento, bairro }))
            .catch(() => undefined);
    }
    alterarDadosPessoais(valores, id) {
        if (valores.nomeCompleto) {
            usuariosMock[id - 1].nomeCompleto = valores.nomeCompleto;
        }
        return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id))
            .then(({ nomeCompleto, dataNascimento, rg, cpf }) => ({ nomeCompleto, dataNascimento, rg, cpf }))
            .catch(() => undefined);
    }
    alterarContatos(valores, id) {
        if (valores.email) {
            usuariosMock[id - 1].email = valores.email;
        }
        return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id))
            .then(({ telefone, celular, email }) => ({ telefone, celular, email }))
            .catch(() => undefined);
    }
    alterarEndereco(valores, id) {
        if (valores.numero) {
            usuariosMock[id - 1].numero = valores.numero;
        }
        return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id))
            .then(({ cep, endereco, numero, complemento, bairro }) => ({ cep, endereco, numero, complemento, bairro }))
            .catch(() => undefined);
    }
    alterarSenha(valores, id) {
        if (valores.senha) {
            usuariosMock[id - 1].senha = valores.senha;
        }
        return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id))
            .then(({ senha }) => ({ senha }))
            .catch(() => undefined);
    }
}

module.exports = new Usuario();