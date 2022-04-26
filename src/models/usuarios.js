const conexao = require("../infraestrutura/conexao");
const fetch = require("node-fetch");

class Usuarios {
  buscaPorUsuario(res) {
    const sql = "SELECT * FROM Usuarios";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  async adiciona(usuario, res) {
    let idUsuario = await this.validarNomeUsuarioNaoUtilizado(usuario.nome);
    let urlUsuario = await this.validarUrlFotoPerfil(usuario.urlFotoPerfil);

    if (urlUsuario == false) {
      res.status(400).json("A URL é invalida");
    } else {
      if (idUsuario > 0) {
        res.status(400).json(`Usuário ${usuario.nome} já cadstrado`);
      } else {
        const sql = "INSERT INTO usuarios SET ?";
        if (usuario.nome.length < 3) {
          res
            .status(400)
            .json("Informe um nome de usuário válido maior que 3 caracteres");
        } else {
          conexao.query(sql, usuario, (erro) => {
            if (erro) {
              res.status(400).json(erro);
            } else {
              res.status(200).json(usuario);
            }
          });
        }
      }
    }
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Usuarios WHERE id=${id}`;

    conexao.query(sql, (erro, resultados) => {
      const usuario = resultados[0];

      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuario);
      }
    });
  }

  deleta(id, res) {
    const sql = "DELETE FROM Usuarios WHERE id=?";

    conexao.query(sql, id, (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }

  altera(id, valores, res) {
    const sql = "UPDATE Usuarios SET ? WHERE id=?";

    conexao.query(sql, [valores, id], (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }

  buscaPorNome(nome, res) {
    const sql = `SELECT * FROM Usuarios WHERE nome like "%${nome}%"`;

    conexao.query(sql, (erro, resultados) => {
      const usuarioBuscado = resultados;
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuarioBuscado);
      }
    });
  }

  validarNomeUsuarioNaoUtilizado(nome) {
    const sql = "SELECT * FROM usuarios WHERE nome = ?";

    return new Promise((resolve, reject) => {
      conexao.query(sql, nome, (erro, resultados) => {
        if (erro) {
          reject(erro);
        } else {
          if (resultados.length > 0) {
            resolve(resultados[0].id);
          } else {
            resolve(0);
          }
        }
      });
    });
  }

  async validarURLFotoPerfil(urlFoto) {
    const expressao =
      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    const regex = new RegExp(expressao);

    if (!urlFoto.match(regex)) {
      return false;
    }

    try {
      const response = await fetch(urlFoto, { method: "HEAD" });
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
}
module.exports = new Usuarios();
