const repositorio = require("../repositorios/usuario");
const fetch = require("node-fetch");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionarUsuario(usuario) {
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
    const existemErros = erros.length;

    if (existemErros) {
      throw { erroApp: erros };
    } else {
      const resp = await repositorio.adicionarUsuario(usuario);
      return { id: resp.insertId, ...usuario };
    }
  }
  alterar(id, valores) {
    return repositorio.alterarId(id, valores);
  }

  excluir(id) {
    return repositorio.excluirUsuario(id);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

  obterDadosPessoais(id) {
    return repositorio.obterDadosPessoais(id);
  }

  atualizarDadosPessoais(id, valores) {
    return repositorio.atualizarDadosPessoais(id, valores);
  }

  obterContatos(id) {
    return repositorio.obterContatos(id);
  }

  atualizarContatos(id, valores) {
    return repositorio.atualizarContatos(id, valores);
  }

  obterEndereco(id) {
    return repositorio.obterEndereco(id);
  }

  atualizarEndereco(id, valores) {
    return repositorio.atualizarEndereco(id, valores);
  }

  atualizarSenha(id, valores) {
    return repositorio.atualizarSenha(id, valores);
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
