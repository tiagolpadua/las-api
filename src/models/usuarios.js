const conexao = require("../infraestrutura/conexao");

class Usuario {
  listarUsuarios(res) {
    const sql = "SELECT * FROM las.usuario";

    conexao.query(sql, (erro, response) => {
      if (erro) res.status(400).json({ error: erro });
      else res.status(200).json(response);
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

  incluirUsuarios(retornoForm, res) {
    const nomeEhvalido = retornoForm.nome.length > 4;

    const erros = {
      nome: retornoForm.nome,
      valido: nomeEhvalido,
      mensagem: "nome deve ser maior do que 4 caracteres",
    };

    const validadeNome = erros.valido;

    if (!validadeNome) {
      res.status(400).json(erros);
    } else {
      const sql = "INSERT INTO las.usuario SET ?";

      conexao.query(sql, retornoForm, (erro) => {
        if (erro) {
          res.status(400).json({ error: erro });
        } else {
          res.status(200).json(retornoForm);
        }
      });
    }
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
