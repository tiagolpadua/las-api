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
}

module.exports = new Usuario();
