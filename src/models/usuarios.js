const conexao = require("../infraestrutura/conexao");

class Usuario {
  buscaUsuario(id, res) {
    const sql = `SELECT * FROM Usuario WHERE id=${id}`;

    conexao.query(sql, (erro, resultados) => {
      const usuarios = resultados[0];

      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuarios);
      }
    });
  }
}

module.exports = new Usuario();
