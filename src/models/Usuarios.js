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

  alterarUsuario(id, retornoForm, res) {
    const sql = "UPDATE las.usuario SET ? WHERE id = ?";

    conexao.query(sql, [retornoForm, id], (erro) => {
      if (erro) {
        res.status(400).json({ error: erro });
      } else {
        res.status(200).json(retornoForm);
      }
    });
  }

  excluirUsuario(id, retornoForm, res) {
    const sql = "DELETE FROM las.usuario WHERE id = ?";

    conexao.query(sql, id, (erro) => {
      if (erro) res.status(400).json({ error: erro });
      else res.status(200).json(retornoForm);
    });
  }
}

module.exports = new Usuario();
