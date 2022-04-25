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
  incluirUsuario(newUser, res) {
    const sqlIsert = "INSERT INTO las.usuario SET ?";

    conexao.query(sqlIsert, newUser, (erro) => {
      if (erro) {
        res.status(400).json({ erro: erro });
      } else {
        res.status(200).json(newUser);
      }
    });
  }
  alterarUsuario(id, modificacao, res) {
    const sqlUpdate = "UPDATE las.usuario SET ? WHERE id = ?";

    conexao.query(sqlUpdate, [modificacao, id], (erro) => {
      if (erro) {
        res.status(400).json({ erro: erro });
      } else {
        res.status(200).json(modificacao);
      }
    });
  }
  listarUsuarios(res) {
    const sqlListar = "SELECT * FROM las.usuario";

    conexao.query(sqlListar, (erro, resultados) => {
      if (erro) {
        res.status(400).json({ err: erro });
      } else {
        res.status(200).json(resultados);
      }
    });
  }
  deletarUsuario(id, res) {
    const sqlDeletar = "DELETE las.usuario SET ? WHERE id = ?";

    conexao.query(sqlDeletar, id, (erro, resultados) => {
      if (erro) {
        res.status(400).json({ erro: erro });
      } else {
        res.status(200).json(resultados);
      }
    });
  }
  buscarUsuarioNome(nome, res) {
    const sqlNome = "SELECT * FROM las.usuario WHERE nome = ?";

    conexao.query(sqlNome, nome, (erro, resultado) => {
      const usuario = resultado[0];

      if (erro) {
        res.status(400).json({ erro: erro });
      } else {
        res.status(200).json(usuario);
      }
    });
  }
}

module.exports = new Usuario();
