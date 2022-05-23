const usuariosMockados = require("./usuariosMock.json");
const dadosPessoais = require("./dadosPessoaisMock.json");
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

  buscarDadosPessoais(id) {
    return Promise.resolve(dadosPessoais[id - 1] ? dadosPessoais[id - 1] : []);
  }

  atualizarDadosPessoais(id, dadosPessoais) {
    return Promise.resolve(dadosPessoais[id - 1] ? dadosPessoais[id - 1] : []);
  }
}

module.exports = new Usuario();
