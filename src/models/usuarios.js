const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  ///Adicionar usuário!!!

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
    const existemErros = erros.length;

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

  ///Atualização e consulta de dados pessoais

  consultarDadosPessoais(id) {
    return repositorio.consultarDadosPessoais(id);
  }
  atualizaDadosPessoais(id, dadosPessoais) {
    return repositorio.atualizarDadosPessoais(id, dadosPessoais);
  }

  //Atualização e consulta de contatos

  consultaContatos(id) {
    return repositorio.consultaContatos(id);
  }
  atualizarContatos(id, dadosContatos) {
    return repositorio.atualizarContatos(id, dadosContatos);
  }

  //Inclusão e consulta de endereço
  consultarEndereco(id) {
    return repositorio.consultarEndereco(id);
  }

  alterarEndereco(id, dadosEndereco) {
    return repositorio.alterarEndereco(id, dadosEndereco);
  }
}

module.exports = new Usuarios();
