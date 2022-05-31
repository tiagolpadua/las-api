const repositorio = require("../repositorios/usuario");
const validacao = require("../infraestrutura/validators/validators");

class Usuarios {
  listar() {
    return repositorio.listarUsuarios();
  }

  buscarPorId(id) {
    return repositorio.buscarPorIdUsuario(id);
  }

  async adicionar(usuario) {
    let nomeEhValido = false;

    if (usuario?.nome?.length > 0) {
      const nomeJaUtilizado = await this.isUsuarioUtilizado(usuario.nome);
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
      const resp = await repositorio.adicionaUsuario(usuario);
      return { id: resp.insertId, ...usuario };
    }
  }

  async alterar(id, valores) {
    let nomeEhValido = false;

    if (valores?.nome?.length > 0) {
      const nomeJaUtilizado = await this.isUsuarioUtilizado(valores.nome);
      if (!nomeJaUtilizado) {
        nomeEhValido = true;
      }
    }

    const urlEhValida = await this.validarURLFotoPerfil(valores?.urlFotoPerfil);

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
      return repositorio
        .alterarUsuario(id, valores)
        .then((resultado) =>
          resultado.changedRows > 0
            ? { resultado: "Alteração feita com sucesso" }
            : resultado
        );
    }
  }

  excluir(id) {
    return repositorio.excluirUsuario(id);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

  async validarURLFotoPerfil(url) {
    return validacao.validarURL(url);
  }

  async isUsuarioUtilizado(nome) {
    return repositorio.vericaNomeUsuario(nome);
  }

  //Dados pessoais

  atualizarDadosPessoais(id, dadosPessoais) {
    const cpfEhValido = validacao.cpfEhValido(dadosPessoais.cpf);

    const validacoes = [
      {
        nome: "cpf",
        valido: cpfEhValido,
        mensagem: "CPF informado não é válido",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      throw { erroApp: erros };
    } else {
      return repositorio
        .atualizarDadosPessoais(id, dadosPessoais)
        .then((resultado) =>
          resultado.changedRows > 0
            ? { resultado: "Alteração feita com sucesso" }
            : resultado
        );
    }
  }

  buscarDadosPessoaisPorId(id) {
    return repositorio.listarDadosPessoaisPorId(id);
  }

  //Contatos

  atualizarContatos(id, contatos) {
    return repositorio
      .atualizarContatos(id, contatos)
      .then((resultado) =>
        resultado.changedRows > 0
          ? { resultado: "Alteração feita com sucesso" }
          : resultado
      );
  }

  buscarContatosPorId(id) {
    return repositorio.listarContatosPorId(id);
  }

  //Senha

  atualizarSenha(id, novaSenha) {
    return repositorio
      .atualizarSenha(id, novaSenha)
      .then((resultado) =>
        resultado.changedRows > 0
          ? { resultado: "Alteração feita com sucesso" }
          : resultado
      );
  }

  //Endereco

  buscarEnderecoPorId(id) {
    return repositorio.listarEnderecoPorId(id);
  }

  atualizarEndereco(id, endereco) {
    return repositorio
      .atualizarEndereco(id, endereco)
      .then((resultado) =>
        resultado.changedRows > 0
          ? { resultado: "Alteração feita com sucesso" }
          : resultado
      );
  }
}

module.exports = new Usuarios();
