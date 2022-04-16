const conexao = require("../infraestrutura/conexao");

class Usuario {
  buscaUsuario(id, res) {
    const sql = "SELECT * FROM Usuarios WHERE id=?";

    conexao.query(sql, id, (erro, resultados) => {
      const usuarios = resultados[0];

      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuarios);
      }
    });
  }

  criaUsuario(usuario, res) {
    const sql = "INSERT INTO Usuarios SET ?";

    conexao.query(sql, usuario, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  listaUsuarios(res) {
    const sql = "SELECT * FROM las.Usuarios";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  alteraUsuario(id, valores, res) {
    const sql = "UPDATE Usuarios SET ? WHERE id=?";

    conexao.query(sql, [valores, id], (erro, resultados) => {
      const usuarios = resultados[0];

      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuarios);
      }
    });
  }

  excluiUsuario(id, res) {
    const sql = "DELETE FROM Usuarios WHERE id=?";

    conexao.query(sql, id, (erro, resultados) => {
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
