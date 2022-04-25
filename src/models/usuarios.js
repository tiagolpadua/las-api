const conexao = require("../infraestrutura/conexao");

class Usuario {
  buscarUsuario(id, res) {
    const sql = "SELECT * FROM las.usuario WHERE id = ?";

    conexao.query(sql, id, (erro, results) => {
      const retornoUsuario = results[0];

      if (erro) {
        res.status(400).json({ erro: erro });
      } else {
        res.status(200).json(retornoUsuario);
      }
    });
  }
}

module.exports = new Usuario();
