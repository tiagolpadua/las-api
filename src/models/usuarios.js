const pool = require("../infraestrutura/database/conexao");
const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  listar() {
    return repositorio.listarUsuarios();
  }

  buscarPorId(id) {
    return repositorio.buscarPorIdUsuario(id);
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
    } else {
      return repositorio.adicionaUsuario(usuario);
    }
  }

  alterar(id, valores) {
    return repositorio.alterarUsuario(id, valores);
  }

  excluir(id) {
    return repositorio.excluirUsuario(id);
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

  //Dados pessoais

  atualizarDadosPessoais(id, dadosPessoais) {
    return repositorio.atualizarDadosPessoais(id, dadosPessoais);
  }

  buscarDadosPessoaisPorId(id) {
    return repositorio.listarDadosPessoaisPorId(id);
  }

  //Contatos

  atualizarContatos(id, contatos) {
    return repositorio.atualizarContatos(id, contatos);
  }

  buscarContatosPorId(id) {
    return repositorio.listarContatosPorId(id);
  }

  //Senha

  atualizarSenha(id, novaSenha) {
    return repositorio.atualizarSenha(id, novaSenha);
  }

  //Endereco

  buscarEnderecoPorId(id) {
    return repositorio.listarEnderecoPorId(id);
  }

  atualizarEndereco(id, endereco) {
    return repositorio.atualizarEndereco(id, endereco);
  }
}

module.exports = new Usuarios();
