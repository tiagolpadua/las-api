const pool = require("../infraestrutura/conexao");
const fetch = require("node-fetch");

class Usuarios {
  listar(res, next) {
    const sql = "SELECT * FROM Usuarios";
    pool.query(sql, (erro, resultados) => {
      if (erro) {
        next(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscarPorId(id, res, next) {
    const sql = "SELECT * FROM Usuarios WHERE id = ?";
    pool.query(sql, id, (erro, resultados) => {
      const usuario = resultados[0];
      if (erro) {
        next(erro);
      } else {
        if (usuario) {
          res.status(200).json(usuario);
        } else {
          res.status(404).end();
        }
      }
    });
  }

  async adicionar(usuario, res, next) {
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

  alterar(id, valores, res, next) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    pool.query(sql, [valores, id], (erro) => {
      if (erro) {
        next(erro);
      } else {
        res.status(200).json(valores);
      }
    });
  }

  excluir(id, res, next) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    pool.query(sql, id, (erro) => {
      if (erro) {
        next(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }

  buscarPorNome(nome, res, next) {
    const sql = "SELECT * FROM Usuarios WHERE nome like ?";
    pool.query(sql, "%" + nome + "%", (erro, resultados) => {
      if (erro) {
        next(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
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
