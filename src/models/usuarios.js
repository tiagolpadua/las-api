const conexao = require("../infraestrutura/conexao");
const fetch = require("node-fetch");

class Usuario {
  buscaCompleta(resposta) {
    const consultaSQL = "SELECT * FROM Usuarios";

    conexao.query(consultaSQL, (erro, resultados) => {
      if (erro) {
        resposta.status(400).json(erro);
      } else {
        resposta.status(200).json(resultados);
      }
    });
  }
  buscaId(id, resposta) {
    const consultaSQL = `SELECT * FROM Usuarios WHERE id=${id}`;
    conexao.query(consultaSQL, (erro, resultados) => {
      const usuario = resultados[0];
      if (erro) {
        resposta.status(400).json(erro);
      } else {
        resposta.status(200).json(usuario);
      }
    });
  }

  buscaNome(nome, resposta) {
    nome = "'%" + nome + "%'";
    const consultaSQL = `SELECT * FROM Usuarios WHERE nome LIKE ${nome}`;
    conexao.query(consultaSQL, (erro, resultados) => {
      if (erro) {
        resposta.status(400).json(erro);
      } else {
        resposta.status(200).json(resultados);
      }
    });
  }
  addUsuario(usuario, resposta) {
    const consultaSQL = "INSERT INTO Usuarios SET ?";
    conexao.query(consultaSQL, usuario, (erro) => {
      if (erro) {
        resposta.status(400).json(erro);
      } else {
        resposta.status(200).json(usuario);
      }
    });
  }
  atualizaUsuario(id, usuario, resposta) {
    const consultaSQL = "UPDATE Usuarios SET ? WHERE id = ?";
    conexao.query(consultaSQL, [id, usuario], (erro) => {
      if (erro) {
        resposta.status(400).json(erro);
      } else {
        resposta.status(200).json({ ...id, usuario });
      }
    });
  }
  excluiUsuario(id, resposta) {
    const consultaSQL = "DELETE FROM Usuarios WHERE id = ?";
    conexao.query(consultaSQL, id, (erro) => {
      if (erro) {
        resposta.status(400).json(erro);
      } else {
        resposta.status(200).json(id);
      }
    });
  }
  async adiciona(usuario, res) {
    const urlValida = await this.validarURLFotoPerfil(usuario.urlFotoPerfil);
    const nomeExistente = await this.validarNomeUsuarioNaoUtilizado(
      usuario.nome
    );
    if (nomeExistente) {
      res.status(400).json("Nome ja existente");
    } else {
      if (!urlValida) {
        res.status(400).json("Url inválida");
      } else {
        const sql = "INSERT INTO Usuarios SET ?";

        conexao.query(sql, usuario, (erro, resultado) => {
          if (erro) {
            res.status(400).json(erro);
          } else {
            res.status(200).json(resultado);
          }
        });
      }
    }
  }

  async validarURLFotoPerfil(fotoPerfil) {
    const regex =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g;
    var urlValida = regex.test(fotoPerfil);
    let statusUrl;
    if (urlValida) {
      try {
        statusUrl = await fetch(fotoPerfil);
        if (statusUrl.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (erro) {
        return false;
      }
    } else {
      return false;
    }
  }

  validarNomeUsuarioNaoUtilizado(nome) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM usuarios WHERE NOME = ?";
      conexao.query(sql, nome, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        } else {
          if (resultado.length > 0) {
            return resolve(true);
          } else {
            return resolve(false);
          }
        }
      });
    });
  }
}

module.exports = new Usuario();
