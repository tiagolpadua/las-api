const conexao = require("../infraestrutura/conexao");

class Usuarios {
  buscaUsuario(id, res) {
    const sql = `SELECT * FROM Usuario WHERE id=${id}`;

    conexao.query(sql, (erro, resultados) => {
      const atendimento = resultados[0];

      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }
}

module.exports = new Usuarios();
