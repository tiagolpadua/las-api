const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");
const { cpf } = require("cpf-cnpj-validator");

class Usuarios {
  listar() {
    return repositorio.listar();
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
    const existemErros = erros.length > 0;

    if (existemErros) {
      throw erros;
    } else {
      const resp = await repositorio.adicionar(usuario);
      return { id: resp.insertId, ...usuario };
    }
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscarPorId(id) {
    return repositorio.buscaPorId(id);
  }
  buscarPorNome(nome) {
    return repositorio.buscaPorNome(nome);
  }

  ///////////////////////////////////////////////dados-pessoais
  listaDadosPessoais(id) {
    return repositorio.listaDadosPessoais(id);
  }

  alterarDadosPessoais(id, valores) {
    const cpfEhValido = this.isCPFValido(valores.cpf);
    if (!cpfEhValido) {
      return Promise.reject({
        nome: "cpf",
        valido: cpfEhValido,
        mensagem: "CPF informado deve ser válido",
      });
    }
    return repositorio.alterarDadosPessoais(id, valores);
  }

  /////////////////////////////////////////////////////contatos
  listaContatos(id) {
    return repositorio.listaContatos(id);
  }

  alterarContatos(id, valores) {
    return repositorio.alterarContatos(id, valores);
  }

  //////////////////////////////////////////////////////endereco
  listaEndereco(id) {
    return repositorio.listaEndereco(id);
  }

  alterarEndereco(id, valores) {
    return repositorio.alterarEndereco(id, valores);
  }

  ///////////////////////////////////////////////////////////senha
  alterarSenha(id, senha) {
    return repositorio.alterarSenha(id, senha);
  }

  //////////////////////////////////////////////////////////validações

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
  isCPFValido(numCpf) {
    return cpf.isValid(numCpf);
  }
}

module.exports = new Usuarios();
