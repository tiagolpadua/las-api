//const moment = require("moment");
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

  // deleta(id, res) {
  //   const sql = "DELETE FROM atendimentos WHERE id = ?";

  //   conexao.query(sql, id, (erro, resultados) => {
  //     if (erro) {
  //       res.status(400).json(erro);
  //     } else {
  //       res.status(200).json({ id });
  //     }
  //   });
  // }
}

module.exports = new Usuario();
