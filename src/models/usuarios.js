const pool = require("../infraestrutura/database/conexao");
const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  // listar(res, next) {
  //   const sql = "SELECT * FROM Usuarios";
  //   pool.query(sql, (erro, resultados) => {
  //     if (erro) {
  //       next(erro);
  //     } else {
  //       res.status(200).json(resultados);
  //     }
  //   });
  // }

  /*  Cod HTTP  - Entidade
  C - 201       - O próprio recurso
  R - 200       - A próprio recurso /usuarios/1 / Uma lista de recursos /usuarios
  U - 200       - O próprio recurso
  D - 204       - Vazio
  */

  listar() {
    return repositorio.listar();
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

  async adicionarOld(usuario, res, next) {
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
      // return new Promise((resolve, reject) => reject(erros));
      return Promise.reject(erros);
    } else {
      return repositorio.adicionar(usuario).then((resultados) => {
        const id = resultados.insertId;
        return { ...usuario, id };
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

  // Ao criar um evento, deve ser validado se a data de início é superior a data atual
  // e se a data de fim é superior à data de início do evento
  // isDatasValidas(dataInicio, dataFim) {
  // Obter a data atual - var now = moment();
  // cont objDataInicio = moment(dataInicio);
  // const objDataFim = moment(dataFim);
  // https://momentjscom.readthedocs.io/en/latest/moment/05-query/01-is-before/
  // }
}

module.exports = new Usuarios();
