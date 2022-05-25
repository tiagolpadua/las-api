const valida = require("./validacoes");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  async buscarPorNome(nome) {
    const resutados = await repositorio.buscarPorNome(nome);
    return resutados[0];
  }

  async buscarPorId(id) {
    const resp = await repositorio.buscarPorId(id);
    return resp[0];
  }

  async buscarEndereco(id) {
    const resp = await repositorio.buscarEndereco(id);
    return resp[0];
  }

  async buscarDadosContatos(id) {
    const resp = await repositorio.buscarDadosContatos(id);
    return resp[0];
  }

  async buscarDadosPessoais(id) {
    const resp = await repositorio.buscarDadosPessoais(id);
    return resp[0];
  }

  async adicionar(usuario) {
    const validacoes = [
      {
        nome: `${usuario.nome}`,
        valido:
          valida.isNomeValido(usuario.nome) &&
          (await this.validarNomeUsuarioNaoUtilizado(usuario.nome)),
        mensagem: "Nome informado deve ser único e não vazio",
      },
      {
        url: `${usuario.urlFotoPerfil}`,
        valido:
          valida.isFormatoUrlFotoValido(usuario.urlFotoPerfil) &&
          (await valida.isStatusFotoValido(usuario.urlFotoPerfil)),
        mensagem: "URL informada deve  ser uma URL válida",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const novoUsuario = await repositorio.adicionar(usuario);

    return erros.length > 0 ? Promise.reject(erros) : novoUsuario[0];
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  alterarContatos(id, telefone, celular, email) {
    return repositorio.alterarContatos(id, telefone, celular, email);
  }

  alterarSenha(id, senha) {
    return repositorio.alterarSenha(id, senha);
  }

  alterarEndereco(id, endereco) {
    return repositorio.alterarEndereco(id, endereco);
  }

  alterarDadosPessoais(id, nomeCompleto, dataNascimento, rg, cpf) {
    return repositorio.alterarDadosPessoais(
      id,
      nomeCompleto,
      dataNascimento,
      rg,
      cpf
    );
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  async validarNomeUsuarioNaoUtilizado(nome) {
    const resultados = await repositorio.buscarPorNome(nome);
    return resultados.length > 0 ? false : true;
  }
}

module.exports = new Usuarios();
