const usuariosMockados = require("./dados_mockados/usuariosMockados.json");
const dadosPessoaisMockados = require("./dados_mockados/dadosPessoaisMockados.json");
const contatosMockados = require("./dados_mockados/contatosMockados.json");
class Usuario {
  listar() {
    return Promise.resolve(usuariosMockados);
  }

  adiciona(usuario) {
    return Promise.resolve(usuario && { insertId: 99 });
  }

  buscaPorId(id) {
    if (isNaN(id)) {
      return Promise.reject();
    }
    return Promise.resolve(
      usuariosMockados.find((usuario) => usuario.id == id)
    );
  }

  async isNomeUsuarioUtilizado(nome) {
    return Promise.resolve(
      !!usuariosMockados.find((usuario) => usuario.nome == nome)
    );
  }

  alterar(id, usuarioAtualizado) {
    if (isNaN(id)) {
      return Promise.reject();
    }
    return Promise.resolve(
      id <= usuariosMockados.length && usuarioAtualizado
        ? { affectedRows: 1 }
        : { affectedRows: 0 }
    );
  }

  excluir(id) {
    return Promise.resolve(
      id <= usuariosMockados.length ? { affectedRows: 1 } : { affectedRows: 0 }
    );
  }

  buscarPorNome(nome) {
    const usuariosBusca = usuariosMockados.filter((user) => {
      const nomeBusca = new RegExp(nome);
      if (user.nome.match(nomeBusca)) {
        return user;
      }
    });

    return Promise.resolve(usuariosBusca.length ? usuariosBusca : false);
  }

  // DADOS PESSOAIS

  buscarDadosPessoais(id) {
    return Promise.resolve(
      dadosPessoaisMockados[id - 1] ? dadosPessoaisMockados[id - 1] : []
    );
  }

  atualizarDadosPessoais(id, dadosPessoais) {
    return Promise.resolve(
      dadosPessoaisMockados[id - 1] && dadosPessoais
        ? { affectedRows: 1 }
        : { affectedRows: 0 }
    );
  }

  // CONTATOS

  buscarContatos(id) {
    return Promise.resolve(
      id <= contatosMockados.length ? contatosMockados[id - 1] : false
    );
  }

  atualizarContatos(id, contatos) {
    return Promise.resolve(
      id <= contatosMockados.length && contatos
        ? { affectedRows: 1 }
        : { affectedRows: 0 }
    );
  }

  // SENHA

  atualizarSenha(id, senha) {
    return Promise.resolve(
      id && senha ? { affectedRows: 1 } : { affectedRows: 0 }
    );
  }

  // ENDEREÇO

  buscarEndereco(id) {
    return Promise.resolve(
      id <= 2
        ? {
            cep: "99999999",
            endereco: "rua r",
            numero: 9,
            bairro: "b",
            complemento: "nenhum",
          }
        : []
    );
  }

  atualizarEndereco(id, endereco) {
    return Promise.resolve(
      id <= 2 && endereco ? { affectedRows: 1 } : { affectedRows: 0 }
    );
  }
}

module.exports = new Usuario();
