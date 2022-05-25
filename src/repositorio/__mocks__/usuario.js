const usuariosMockados = require("./dados_mockados/usuariosMock.json");
const dadosPessoaisMockados = require("./dados_mockados/dadosPessoaisMock.json");
const contatosMockados = require("./dados_mockados/contatos.json");
class Usuario {
  listar() {
    return Promise.resolve(usuariosMockados);
  }

  adiciona(usuario) {
    return Promise.resolve(usuario && { insertId: 99 });
  }

  buscaPorId(id) {
    return Promise.resolve(
      usuariosMockados.find((usuario) => usuario.id == id)
    );
  }

  async isNomeUsuarioUtilizado(nome) {
    return Promise.resolve(
      !!usuariosMockados.find((usuario) => usuario.nome == nome)
    );
  }

  // eslint-disable-next-line no-unused-vars
  alterar(id, usuarioAtualizado) {
    return Promise.resolve(
      usuariosMockados.find((usuario) => usuario.id == id)
    );
  }

  excluir(id) {
    return Promise.resolve(
      usuariosMockados.find((usuario) => usuario.id == id)
    );
  }

  buscarPorNome(nome) {
    const usuariosBusca = usuariosMockados.filter((user) => {
      const nomeBusca = new RegExp(nome);
      if (user.nome.match(nomeBusca)) {
        return user;
      }
    });
    return Promise.resolve(usuariosBusca);
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
        ? dadosPessoaisMockados[id - 1]
        : []
    );
  }

  // CONTATOS

  buscarContatos(id) {
    return Promise.resolve(
      contatosMockados[id - 1] ? contatosMockados[id - 1] : []
    );
  }

  atualizarContatos(id, contatos) {
    return Promise.resolve(
      contatosMockados[id - 1] && contatos ? contatosMockados : []
    );
  }

  // SENHA

  atualizarSenha(id, senha) {
    return Promise.resolve(id && senha ? senha : []);
  }

  // ENDEREÇO

  buscarEndereco(id) {
    return Promise.resolve(
      id < 2
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
    return Promise.resolve(id && endereco ? endereco : []);
  }
}

module.exports = new Usuario();
