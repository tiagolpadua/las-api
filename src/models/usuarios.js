const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");
const { cpf } = require("cpf-cnpj-validator");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

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

    const cpfEhValido = cpf.isValid(usuario.cpf);
    const urlEhValida = await this.validarURLFotoPerfil(usuario?.urlFotoPerfil);

    const validacoes = [
      {
        nome: "nome",
        valido: nomeEhValido,
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "urlFotoPerfil",
        valido: urlEhValida,
        mensagem: "URL deve ser uma URL válida",
      },
      {
        nome: "cpf",
        valido: cpfEhValido,
        mensagem: "CPF deve ser válido",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      throw { erroApp: erros };
    } else {
      const resposta = await repositorio.adicionar(usuario);
      return { id: resposta.insertId, ...usuario };
    }
  }

  alterar(valores, id) {
    return repositorio.alterar(valores, id);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

  // dados pessoais

  listarDadosPessoais(id) {
    return repositorio.listarDadosPessoais(id);
  }

  alterarDadosPessoais(valores, id) {
    return repositorio.alterarDadosPessoais(valores, id);
  }

  // contatos

  listarContatos(id) {
    return repositorio.listarContatos(id);
  }

  alterarContatos(valores, id) {
    return repositorio.alterarContatos(valores, id);
  }

  // senha

  alterarSenha(senha, id) {
    return repositorio.alterarSenha(senha, id);
  }

  // endereço

  listarEndereco(id) {
    return repositorio.listarEndereco(id);
  }

  alterarEndereco(valores, id) {
    return repositorio.alterarEndereco(valores, id);
  }

  async validarURLFotoPerfil(url) {
    try {
      const regex =
        /https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/gm;
      const verificaUrl = url.match(regex);
      if (!verificaUrl) {
        return false;
      }
      const response = await fetch(url);
      if (response.status !== 200) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  }
}
module.exports = new Usuarios();
