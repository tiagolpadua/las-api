const conexao = require("../infraestrutura/conexao");
const fetch = require("node-fetch");

class Usuario {
  buscaPorId(id, res) {
    const sql = `SELECT * FROM usuario WHERE id=${id}`;

    conexao.query(sql, (erro, resultados) => {
      const usuarioProcurado = resultados[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuarioProcurado);
      }
    });
  }

  buscaPorNome(nome, res) {
    const sql = `SELECT * FROM usuario WHERE nome like "%${nome}%"`;

    conexao.query(sql, (erro, resultados) => {
      const usuarioProcurado = resultados;
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuarioProcurado);
      }
    });
  }

  lista(res) {
    const sql = "SELECT * FROM usuario";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  adiciona(dadosDoUsuario, res) {

    
    const sql = "INSERT INTO usuario SET ?";

    
    conexao.query(sql, dadosDoUsuario, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json(dadosDoUsuario);
      }
    });
  }

  altera(id, valores, res) {
    const sql = "UPDATE usuario SET ? WHERE id=?";

    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }

  deleta(id, res) {
    const sql = "DELETE FROM usuario WHERE id=?";

    conexao.query(sql, id, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

//   altera(id, valores, res) {
//     const sql = "UPDATE Atendimentos SET ? WHERE id=?";

//     conexao.query(sql, [valores, id], (erro, resultados) => {
//       if (erro) {
//         res.status(400).json(erro);
//       } else {
//         res.status(200).json({ ...valores, id });
//       }
//     });
//   }

module.exports = new Usuario();
