const conexao = require("../infraestrutura/conexao");
const fetch = require("node-fetch");

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

  buscaNome(nome, res) {
    const sql = "SELECT * FROM usuarios WHERE nome = ?";
    conexao.query(sql, nome, (erro, resultado) => {
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

  lista(res) {
    const sql = "SELECT * FROM usuarios";
    conexao.query(sql, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultado);
      }
    });
  }

  altera(id, usuario, res) {
    const sql = "UPDATE usuarios SET ? WHERE id = ?";
    conexao.query(sql, [usuario, id], (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultado);
      }
    });
  }

  deleta(id, res) {
    const sql = "DELETE FROM usuarios WHERE id = ?";
    conexao.query(sql, id, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultado);
      }
    });
  }

  validarNomeUsuarioNaoUtilizado(nome, res, usuario) {
    const sql = "SELECT * FROM usuarios WHERE nome = ?";
    conexao.query(sql, nome, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        if (resultado.length > 0) {
          res.send(`Usuário ${nome} já existe no banco de dados`);
        } else {
          adicionar(usuario, res);
        }
      }
    });
  }

  validarURLFotoPerfil(url) {
    async function validaUrl(url) {
      try {
        const resposta = await fetch(url);
        if (resposta.status === 200) {
          return true;
        }
      } catch (erro) {
        return false;
      }
    }
    return validaUrl(url);
  }
}
function adicionar(usuario, res) {
  const sql = "INSERT INTO usuarios SET ?";
  conexao.query(sql, usuario, (erro, resultado) => {
    if (erro) {
      res.status(400).json(erro);
    } else {
      res.status(201).json(resultado);
    }
  });
}

module.exports = new Usuario();
