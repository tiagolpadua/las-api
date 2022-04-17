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
  adiciona(usuario, res) {
    const sql = "INSERT INTO usuarios SET ?";
    conexao.query(sql, usuario, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json(resultado);
      }
    });
  }
}

module.exports = new Usuario();
