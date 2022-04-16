const conexao = require("../infraestrutura/conexao");

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

  adiciona(usuario, res) {
    const sql = "INSERT INTO usuarios SET ?";

    conexao.query(sql, usuario, (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json(usuario);
      }
    });
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
}

module.exports = new Usuario();
