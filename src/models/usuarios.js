const conexao = require("../infraestrutura/conexao");

class Usuario {
  buscaId(id, res) {
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    conexao.query(sql, id, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultado);
      }
    });
  }
}

module.exports = new Usuario();
