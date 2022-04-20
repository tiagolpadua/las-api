//const moment = require("moment");
const fetch = require("node-fetch");
const conexao = require("../infraestrutura/conexao");

class Usuario {
  adiciona(usuario, res) {
    const nomeEhValido = usuario.nome.length >= 5;

    const validacoes = [
      {
        nome: "nome",
        valido: nomeEhValido,
        mensagem: "Nome deve ter pelo menos cinco caracteres",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const usuarioObj = { ...usuario };

      const sql = "INSERT INTO Usuarios SET ?";

      conexao.query(sql, usuarioObj, (erro) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(usuario);
        }
      });
    }
  }

  lista(res) {
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
    const sql = `SELECT * FROM usuarios WHERE id = ${id}`;

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
    // const idUsuario = `SELECT id FROM usuarios WHERE nome like '%${nome}%'`;
    const sql = `SELECT * FROM usuarios WHERE nome LIKE '%${nome}%'`;

    conexao.query(sql, [nome], (erro, resultados) => {
      const usuario = resultados[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuario);
      }
    });
  }

  altera(id, valores, res) {
    const sql = "UPDATE usuarios SET ? WHERE id =?";

    conexao.query(sql, [valores, id], (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...valores, id });
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

  // validaUrl2(url, res) {
  //   var expression =
  //     /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  //   var regex = new RegExp(expression);
  // }

  async validarURLFotoPerfil(url) {
    const regex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    var urlValida = regex.test(url);
    let statusCodeUrl;
    if (urlValida) {
      try {
        statusCodeUrl = await fetch(url);
        return statusCodeUrl.status === 200 ? true : false;
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  }
}

module.exports = new Usuario();
