const conexao = require("../infraestrutura/conexao");
// const fetch = require("node-fetch");

class Usuario {
  incluirUsuarios(retornoForm, res) {
    const sql = "INSERT INTO las.usuario SET ?";

    conexao.query(sql, retornoForm, (erro) => {
      if (erro) {
        res.status(400).json({ error: erro });
      } else {
        res.status(200).json(retornoForm);
      }
    });
  }

  buscaUsuario(id, res) {
    const sql = "SELECT * FROM las.usuario WHERE id = ?";

    conexao.query(sql, id, (erro, results) => {
      const retornoUsuario = results[0];

      if (erro) res.status(400).json({ error: erro });
      else res.status(200).json(retornoUsuario);
    });
  }
}

module.exports = new Usuario();
