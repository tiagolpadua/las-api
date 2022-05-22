const Validacoes = require("../infraestrutura/validacoes");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  //Refatoração - OK
  async listar() {
    return await repositorio.listar();
  }

  //Refatoração - OK
  async buscaPorId(id) {
    const usuario = await repositorio.buscaPorId(id);

    return usuario;
  }

  //Refatoração - OK
  async adicionar(usuario) {
    const nomeEhValido =
      usuario.nome.length > 0 &&
      (await this.validarNomeUsuarioNaoUtilizado(usuario.nome));

    const urlEhValida = await Validacoes.validarUrl(usuario.urlFotoPerfil);

    const validacoes = [
      {
        nome: "nome",
        valido: nomeEhValido,
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "urlFotoPerfil",
        valido: urlEhValida,
        mensagem: "URL deve uma URL válida",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      return Promise.reject(erros);
    } else {
      return repositorio.adicionar(usuario).then((resultados) => {
        const id = resultados.insertId;
        return { ...usuario, id };
      });
    }
  }

  //Refatoração - OK
  async alterar(id, valores) {
    return await repositorio.alterar(id, valores);
  }

  //Refatoração - OK
  async excluir(id) {
    return await repositorio.excluir(id);
  }

  //Refatoração - OK
  async buscaPorNome(nome) {
    return await repositorio.buscaPorNome(nome);
  }

  validarNomeUsuarioNaoUtilizado(nome) {
    const resultado = repositorio.validarNomeNaoUtilizado(nome);
    return !(resultado > 0);
  }
}

module.exports = new Usuarios();
