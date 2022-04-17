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

    if (await this.validarURLFotoPerfil(usuario.urlFotoPerfil)) {
      conexao.query(sql, usuario, (erro) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(usuario);
        }
      });
    } else {
      res.status(400).json("Url Inválida");
    }
  }

  atualiza(id, usuarioNovo, res) {
    const sql = "UPDATE usuarios SET ? WHERE id = ?";

    conexao.query(sql, [usuarioNovo, id], (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...usuarioNovo, id });
      }
    });
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
}

module.exports = new Usuario();
