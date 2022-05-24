const pool = require("../infraestrutura/database/conexao");
const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  listar() {
    return repositorio.listar();
  }
  async adicionar(usuario) {
    const nomeEhValido =
      usuario.nome.length > 0 &&
      (await this.validarNomeUsuarioNaoUtilizado(usuario.nome));

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
    const existemErros = erros.length;

    if (existemErros) {
      return new Promise((resolve, reject) => reject(erros));
    }

    return repositorio.adiciona(usuario);
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

  //dados-pessoais
  listaDadosPessoais(id) {
    return repositorio.listaDadosPessoais(id);
  }

  alterarDadosPessoais(id, valores) {
    return repositorio.alterarDadosPessoais(id, valores);
  }

  //contatos
  listaContatos(id) {
    return repositorio.listaContatos(id);
  }

  alterarContatos(id, valores) {
    return repositorio.alterarContatos(id, valores);
  }

  //endereco
  listaEndereco(id) {
    return repositorio.listaEndereco(id);
  }

  alterarEndereco(id, valores) {
    return repositorio.alterarEndereco(id, valores);
  }

  //senha
  alterarSenha(id, senha) {
    return repositorio.alterarSenha(id, senha);
  }

  //validações

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

  async validarNomeUsuarioNaoUtilizado(nome) {
    return new Promise((resolve) => {
      const sql = "SELECT * FROM Usuarios WHERE nome = ?";
      pool.query(sql, nome, (erro, resultados) => {
        if (erro) {
          resolve(false);
        } else {
          if (resultados.length > 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      });
    });
  }
}

module.exports = new Usuarios();
