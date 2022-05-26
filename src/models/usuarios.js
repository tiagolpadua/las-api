const repositorio = require("../repositorios/usuario");
const fetch = require("node-fetch");

class Usuarios {
  //ok
  listar() {
    return repositorio.listar();
  }

  //ok
  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  //ok
  async adicionar(usuario) {
    let nomeEhValido = false;

    if (usuario?.nomeCompleto?.length > 0) {
      const nomeJaUtilizado = await !repositorio.isNomeUsuarioUtilizado(
        usuario.nomeCompleto
      );

      if (!nomeJaUtilizado) {
        nomeEhValido = true;
      }
    }

    const urlEhValida = await this.validarURLFotoPerfil(usuario.urlFotoPerfil);
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
      console.log(erros);
      throw { erroApp: erros };
    } else {
      const resp = await repositorio.adiciona(usuario);
      return { id: resp.insertId, ...usuario };
    }
  }

  //ok
  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  //ok
  excluir(id, res) {
    if(repositorio.buscarPorId(id)){
      return repositorio.excluir(id, res);
    }else{
      return false;
    }
  }

  //ok
  buscarPorNome(nome, res) {
    return repositorio.buscarPorNome(nome, res);
  }
  //ok
  listarDadosPessoais(id) {
    return repositorio.listarDadosPessoais(id);
  }

  //ok
  alterarDadosPessoais(id, valores) {
    return repositorio.alterarDadosPessoais(id, valores);
  }

  //ok
  listarContatos(id) {
    return repositorio.listarContatos(id);
  }

  //ok
  alterarContatos(id, valores) {
    return repositorio.alterarContatos(id, valores);
  }

  //ok
  alterarSenha(id, valores) {
    return repositorio.alterarSenha(id, valores);
  }

  //ok
  listarEndereco(id) {
    return repositorio.listarEndereco(id);
  }

  //ok
  alterarEndereco(id, valores) {
    return repositorio.alterarEndereco(id, valores);
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
