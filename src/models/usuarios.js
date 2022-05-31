const Validacoes = require("../infraestrutura/validacoes");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  //Refatoração - OK
  async listar() {
    return await repositorio.listar();
  }

  //Refatoração - OK
  async buscarPorId(id) {
    const usuario = await repositorio.buscarPorId(id);

    return usuario;
  }

  //Refatoração - OK
  async adicionar(usuario) {
    let nomeEhValido = false;

    if (usuario?.nome?.length > 0) {
      const nomeJaUtilizado = await repositorio.isNomeUsuarioUtilizado(
        usuario.nome
      );

      if (!nomeJaUtilizado) {
        nomeEhValido = true;
      }
    }

    const urlEhValida = await Validacoes.validarUrl(usuario?.urlFotoPerfil);

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
      throw { erroApp: erros };
    } else {
      const resp = await repositorio.adicionar(usuario);
      return { id: resp.insertId, ...usuario };
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

  async buscarDadosPessoaisDoUsuario(id) {
    return await repositorio.buscarDadosPessoaisDoUsuario(id);
  }

  async atualizarDadosPessoaisDoUsuario(id, valores) {
    return await repositorio.atualizarDadosPessoaisDoUsuario(id, valores);
  }

  async buscarContatosDoUsuario(id) {
    return await repositorio.buscarContatosDoUsuario(id);
  }

  async atualizarContatosDoUsuario(id, valores) {
    return await repositorio.atualizarContatosDoUsuario(id, valores);
  }

  async atualizarSenhaDoUsuario(id, senha) {
    return await repositorio.atualizarSenhaDoUsuario(id, senha);
  }

  async buscarEndereçoDoUsuario(id){
    return await repositorio.buscarEnderecoDoUsuario(id);
  }

  async atualizarEnderecoDoUsuario(id, valores){
    return await repositorio.atualizarEnderecoDoUsuario(id, valores);
  }
}

module.exports = new Usuarios();
