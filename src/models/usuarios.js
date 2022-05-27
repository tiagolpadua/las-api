const pool = require("../infraestrutura/database/conexao");
const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");
const { cpf } = require("cpf-cnpj-validator");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(usuario) {
    const nomeEhValido =
      usuario.nomeCompleto.length > 0 &&
      (await this.validarNomeUsuarioNaoUtilizado(usuario.nomeCompleto));

    const cpfEhValido = cpf.isValid(usuario.cpf);
    const urlEhValida = await this.validarURLFotoPerfil(usuario.urlFotoPerfil);

    const validacoes = [
      {
        nome: "nome",
        valido: nomeEhValido,
        mensagem: "Nome deve ser informado e deve ser único"
      },
      {
        nome: "urlFotoPerfil",
        valido: urlEhValida,
        mensagem: "URL deve uma URL válida"
      },
      {
        nome: "cpf",
        valido: cpfEhValido,
        mensagem: "CPF deve ser válido"
      }
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      return Promise.reject(erros);
    } else {
        return repositorio.adicionar(usuario);
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

  // dados pessoais

  listarDadosPessoais(id) {
    return repositorio.listarDadosPessoais(id);
  }

  alterarDadosPessoais(valores, id) {
    return repositorio.alterarDadosPessoais(valores, id);
  }


  // contatos

  listarContatos(id) {
    return repositorio.listarContatos(id);
  }

  alterarContatos(valores, id) {
    return repositorio.alterarContatos(valores, id);
  }

  // senha

  alterarSenha(senha, id) {
    return repositorio.alterarSenha(senha, id);
  }

  // endereço

  listarEndereco(id) {
    return repositorio.listarEndereco(id);
  }

  alterarEndereco(valores, id) {
    return repositorio.alterarEndereco(valores, id);
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
      const sql = "SELECT * FROM Usuarios WHERE nomeCompleto = ?";
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
