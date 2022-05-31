const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id)
      .then(resultados => resultados);
  }

  async adicionar(usuario) {
    let nomeEhValido = false;
    let nomeJaUtilizado = false;

    if (usuario?.nome?.length > 0) {
      nomeJaUtilizado = await repositorio.isNomeUsuarioUtilizado(usuario.nome);
    }

    if (!nomeJaUtilizado && usuario?.nome?.length > 4) {
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
    const existemErros = erros.length > 0;

    if (existemErros) {
      throw { erroApp: erros };
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

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
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

  listarDadosPessoais(id) {
    return repositorio.listarDadosPessoais(id);
  }

  alterarDadosPessoais(id, dadosPessoais) {
    return repositorio.alterarDadosPessoais(id, dadosPessoais);
  }

  listarContatos(id) {
    return repositorio.listarContatos(id);
  }

  alterarContatos(id, contatos) {
    return repositorio.alterarContatos(id, contatos);
  }

  alterarSenha(id, senha) {
    return repositorio.alterarSenha(id, senha);
  }

  listarEndereco(id) {
    return repositorio.listarEndereco(id);
  }

  alterarEndereco(id, endereco) {
    return repositorio.alterarEndereco(id, endereco);
  }
}

module.exports = new Usuarios();
