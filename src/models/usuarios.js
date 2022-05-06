const valida = require("./validacoes");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(usuario) {
    const validacoes = [
      {
        nome: `${usuario.nome}`,
        valido:
          valida.validarNome(usuario.nome) &&
          (await this.validarNomeUsuarioNaoUtilizado(usuario.nome)),
        mensagem: "Nome informado deve ser único e não vazio",
      },
      {
        url: `${usuario.urlFotoPerfil}`,
        valido:
          valida.validarFormatoUrl(usuario.urlFotoPerfil) &&
          (await valida.validarURLFotoPerfil(usuario.urlFotoPerfil)),
        mensagem: "URL informada deve  ser uma URL válida",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);

    return erros.length > 0
      ? Promise.reject(erros)
      : repositorio.adicionar(usuario);
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

  async validarNomeUsuarioNaoUtilizado(nome) {
    const resultados = await repositorio.buscarPorNome(nome);
    return resultados.length > 0 ? false : true;
  }
}

module.exports = new Usuarios();
