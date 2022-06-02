const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");
const cpfValidator = require("cpf-cnpj-validator").cpf;

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(usuario) {

    let nomeEhValido = false;

    if (usuario?.nome?.length > 4) {
      const nomeJaUtilizado = await repositorio.isNomeUsuarioUtilizado(usuario.nome);

      if (!nomeJaUtilizado)
        nomeEhValido = true;
    }

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

  alterar(valores, id) {
    return repositorio.alterar(valores, id);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }
  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }
  buscarDadosPessoais(id) {
    return repositorio.buscarDadosPessoais(id);
  }
  buscarContatos(id) {
    return repositorio.buscarContatos(id);
  }
  buscarEndereco(id) {
    return repositorio.buscarEndereco(id);
  }
  alterarDadosPessoais(valores, id) {
    if (valores.cpf) {
      const { cpf } = valores;
      return cpfValidator.isValid(cpf) ? repositorio.alterarDadosPessoais(valores, id) : Promise.reject({ codigo: 1 });
    } else {
      return repositorio.alterarDadosPessoais(valores, id);
    }

  }
  alterarContatos(valores, id) {
    return repositorio.alterarContatos(valores, id);
  }
  alterarEndereco(valores, id) {
    return repositorio.alterarEndereco(valores, id);
  }
  alterarSenha(valores, id) {
    return repositorio.alterarSenha(valores, id);
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