const fetch = require("node-fetch");
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
          usuario.nome.length > 0 &&
          (await this.validarNomeUsuarioNaoUtilizado(usuario.nome)),
        mensagem: "Nome informado deve ser único e não vazio",
      },
      {
        url: `${usuario.urlFotoPerfil}`,
        valido:
          this.validaFormatoUrl(usuario.urlFotoPerfil) &&
          (await this.validarURLFotoPerfil(usuario.urlFotoPerfil)),

        mensagem: "URL informada deve  ser uma URL válida",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    if (erros.length > 0) {
      return erros;
    } else {
      return await repositorio.adicionar(usuario);
    }
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

  validaFormatoUrl(url) {
    const regex =
      /https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/gm;
    const EUmaUrl = url.match(regex);
    return !EUmaUrl ? false : true;
  }

  async validarURLFotoPerfil(url) {
    const response = await fetch(url, { method: "HEAD" });
    return response.status !== 200 ? false : true;
  }

  async validarNomeUsuarioNaoUtilizado(nome) {
    const resultados = await repositorio.buscarPorNome(nome);
    return resultados.length > 0 ? false : true;
  }
}

module.exports = new Usuarios();
