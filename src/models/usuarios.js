const valida = require("./validacoes");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  buscarEndereco(id) {
    return repositorio.buscarEndereco(id);
  }

  buscarDadosContatos(id) {
    return repositorio.buscarDadosContatos(id);
  }

  buscarDadosPessoais(id) {
    return repositorio.buscarDadosPessoais(id);
  }

  async adicionar(usuario) {
    const validacoes = [
      {
        nome: `${usuario.nome}`,
        valido:
          valida.isNomeValido(usuario?.nome) &&
          !(await this.isNomeUltilizado(usuario?.nome)),
        mensagem: "Nome informado deve ser único e não vazio",
      },
      {
        url: `${usuario.urlFotoPerfil}`,
        valido:
          valida.isFormatoUrlFotoValido(usuario?.urlFotoPerfil) &&
          (await valida.isStatusFotoValido(usuario?.urlFotoPerfil)),
        mensagem: "URL informada deve  ser uma URL válida",
      },

      {
        cpf: `${usuario.cpf}`,
        valido: valida.isCpfValido(usuario?.cpf),
        mensagem: "CPF informado deve ser válido",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    if (erros.length > 0) {
      return Promise.reject(erros);
    } else {
      return repositorio.adicionar(usuario);
    }
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

  async isNomeUltilizado(nome) {
    const resultados = await repositorio.buscarPorNome(nome);
    return resultados?.length > 0 ? true : false;
  }
}

module.exports = new Usuarios();
