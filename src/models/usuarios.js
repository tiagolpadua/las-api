const conexao = require("../infraestrutura/conexao");
const fetch = require("node-fetch");

class Usuario {
  buscaTodos(res) {
    const sql = "SELECT * FROM usuarios";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM usuarios WHERE id=${id}`;

    conexao.query(sql, (erro, resultados) => {
      const usuario = resultados[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuario);
      }
    });
  }

  buscaPorNome(nome, res) {
    nome = "'%" + nome + "%'";
    const sql = `SELECT * FROM usuarios WHERE nome LIKE ${nome}`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  async adiciona(usuario, res) {
    const sql = "INSERT INTO usuarios SET ?";
    const urlValida = await this.validarURLFotoPerfil(usuario.urlFotoPerfil);
    const nomeValido = await this.validarNomeUsuarioNaoUtilizado(usuario.nome);

    if (!urlValida) {
      res.status(400).json("Url Inválida");
    } else if (!nomeValido) {
      res.status(400).json("Nome Não Disponível");
    } else {
      conexao.query(sql, usuario, (erro) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(usuario);
        }
      });
    }
  }

  async atualiza(id, usuarioNovo, res) {
    const sql = "UPDATE usuarios SET ? WHERE id = ?";
    const urlValida = await this.validarURLFotoPerfil(
      usuarioNovo.urlFotoPerfil
    );

    if (urlValida) {
      // Verifica se nome é válido
      // (Próprio nome do usuario a ser atualizado ou nome não cadastrado)
      const sqlBusca = "SELECT * FROM usuarios WHERE nome = ?";

      conexao.query(sqlBusca, usuarioNovo.nome, (erro, resBusca) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          if (resBusca.length == 0 || resBusca[0].id == id) {
            conexao.query(sql, [usuarioNovo, id], (erro) => {
              if (erro) {
                res.status(400).json(erro);
              } else {
                res.status(200).json({ ...usuarioNovo, id });
              }
            });
          } else {
            res.status(400).json("Nome Não Disponível");
          }
        }
      });
    } else {
      res.status(400).json("Url Inválida");
    }
  }

  deleta(id, res) {
    const sql = "DELETE FROM usuarios WHERE id = ?";

    conexao.query(sql, id, (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }

  async validarURLFotoPerfil(url) {
    try {
      const expressao =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

      const regex = new RegExp(expressao);

      if (url.match(regex)) {
        const res = await fetch(url);
        return res.status == 200 ? true : false;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  validarNomeUsuarioNaoUtilizado(nome) {
    const sql = "SELECT * FROM usuarios WHERE nome = ?";

    return new Promise((resolve, reject) => {
      conexao.query(sql, nome, (erro, resultados) => {
        if (erro) {
          reject(erro);
        } else {
          resolve(resultados.length > 0 ? false : true);
        }
      });
    });
  }
}

module.exports = new Usuario();
