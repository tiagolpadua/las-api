const repositorios = require("../repositorios/usuario");
const { validarNome } = require("./validações");
class Usuarios {
  listar() {
    return repositorios.listar();
  }

  async adicionar(usuario) {
    const validacao = await validarNome(usuario);
    if (validacao) {
      return repositorios.adicionar(usuario);
    } else {
      return validacao;
    }
  }

  buscarPorId(id) {
    return repositorios.buscarPorId(id);
  }
  alterar(id, valores) {
    return repositorios.alterar(id, valores);
  }

  excluir(id) {
    return repositorios.excluir(id);
  }

  buscarPorNome(nome) {
    return repositorios.buscarPorNome(nome);
  }
}

module.exports = new Usuarios();
