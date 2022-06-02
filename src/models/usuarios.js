const repositorio = require("../repositorio/usuario");
const fetch = require("node-fetch");
const { cpf } = require("cpf-cnpj-validator");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscaPorId(id);
  }

  async adicionar(usuario) {
    let nomeEhValido = false;
    if (usuario?.nome?.length > 0) {
      const nomeUtilizado = await repositorio.isNomeUsuarioUtilizado(
        usuario.nome
      );

      if (!nomeUtilizado) {
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
    const existemErros = erros.length;

    if (existemErros) {
      return Promise.reject(erros);
    }
    const resp = await repositorio.adiciona(usuario);
    return { id: resp.insertId, ...usuario };
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

  buscarDadosPessoais(id) {
    return repositorio.buscarDadosPessoais(id);
  }

  atualizarDadosPessoais(id, dadosPessoais) {
    const cpfEhValido = this.isCPFValido(dadosPessoais.cpf);
    if (!cpfEhValido) {
      return Promise.reject({
        nome: "cpf",
        valido: cpfEhValido,
        mensagem: "CPF informado deve ser válido",
      });
    }
    return repositorio.atualizarDadosPessoais(id, dadosPessoais);
  }

  buscarContatos(id) {
    return repositorio.buscarContatos(id);
  }

  atualizarContatos(id, valores) {
    if (isNaN(id)) {
      return Promise.reject();
    }
    return repositorio.atualizarContatos(id, valores);
  }

  atualizarSenha(id, valores) {
    if (isNaN(id)) {
      return Promise.reject();
    }
    return repositorio.atualizarSenha(id, valores);
  }

  buscarEndereco(id) {
    return repositorio.buscarEndereco(id);
  }

  atualizarEndereco(id, valores) {
    if (isNaN(id)) {
      return Promise.reject();
    }
    return repositorio.atualizarEndereco(id, valores);
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

  isCPFValido(numCpf) {
    return cpf.isValid(numCpf);
  }
}

module.exports = new Usuarios();
