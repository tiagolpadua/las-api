const pool = require("../infraestrutura/database/conexao");
const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(usuario, res, next) {
    const validacoes = [
      {
        nome: "nome",
        valido:
          usuario.nome.length > 0 &&
          (await this.validarNomeUsuarioNaoUtilizado(usuario.nome)),
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "urlFotoPerfil",
        valido:
          this.validaFormatoUrl(usuario.urlFotoPerfil) &&
          this.validarURLFotoPerfil(usuario.urlFotoPerfil),
        mensagem: "URL deve uma URL válida",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const sql = "INSERT INTO Usuarios SET ?";

      pool.query(sql, usuario, (erro) => {
        if (erro) {
          next(erro);
        } else {
          res.status(201).json(usuario);
        }
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

  validaFormatoUrl(url) {
    const regex =
      /https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/gm;
    const verificaUrl = url.match(regex);
    if (!verificaUrl) {
      return false;
    }
    return true;
  }

  async validarURLFotoPerfil(url) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.status !== 200 ? false : true;
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
