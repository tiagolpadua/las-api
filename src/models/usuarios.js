const pool = require("../infraestrutura/database/conexao");
const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  constructor(){
    this.validacoes = [
      {
        nome: "nome",
        valido: this.nomeEhValido,
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "urlFotoPerfil",
        valido: this.urlEhValida,
        mensagem: "URL deve uma URL válida",
      },
    ];
  }
  
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(usuario) {
    this.nomeEhValido =
      usuario.nome.length > 0 &&
      (await this.validarNomeUsuarioNaoUtilizado(usuario.nome));

    this.urlEhValida = await this.validarURLFotoPerfil(usuario.urlFotoPerfil);

    const erros = this.validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      return new Promise((resolve, reject) => reject(erros));
    } else {
      return repositorio.adicionar(usuario)
      .then( resultados => {
        const id = resultados.insertId;
        return { ...usuario, id};
      });
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
