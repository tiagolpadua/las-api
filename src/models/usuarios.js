const conexao = require("../infraestrutura/conexao");
// const http = require("http");
const fetch = require("node-fetch");

class Usuario {
  listarUsuarios(res) {
    const sql = "SELECT * FROM las.usuario";

    conexao.query(sql, (erro, results) => {
      if (erro) res.status(400).json({ error: erro });
      else res.status(200).json(results);
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

  buscaUsuarioPeloNome(nome, res) {
    const sql = "SELECT * FROM las.usuario WHERE nome = ?";

    conexao.query(sql, nome, (erro, results) => {
      const retornoUsuario = results[0];

      if (erro) res.status(400).json({ error: erro });
      else res.status(200).json(retornoUsuario);
    });
  }

  async validarURLFotoPerfil(retornoForm) {
    const validadorUrl =
      /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/gi;
    const urlEhValida = validadorUrl.test(retornoForm);

    if (urlEhValida) {
      try {
        const response = await fetch(retornoForm);
        return response.status;
      } catch (err) {
        return false;
      }
    }

    return false;
  }

  validarNomeUsuarioNaoUtilizado(retornoForm) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM las.usuario WHERE nome = ?";
      conexao.query(sql, retornoForm.nome, (erro, results) => {
        if (erro) {
          return reject(erro);
        }

        return resolve(results);
      });
    });
  }

  async incluirUsuarios(retornoForm, res) {
    const { validadeNome, erros } = this.verificaTamanhoNome(retornoForm);
    const urlEhValida = await this.validarURLFotoPerfil(
      retornoForm.urlFotoPerfil
    );

    const nomeExiste = await this.validarNomeUsuarioNaoUtilizado(retornoForm);

    if (!validadeNome) {
      res.status(400).json(erros);
    } else if (!urlEhValida) {
      res.status(400).json("url inválida");
    } else if (nomeExiste.length) {
      res.status(400).json("nome já existe na base de dados");
    } else {
      const sql = "INSERT INTO las.usuario SET ?";

      conexao.query(sql, retornoForm, (erro) => {
        if (erro) {
          res.status(400).json({ error: erro });
        } else {
          res.status(200).json(retornoForm);
          console.log(nomeExiste);
        }
      });
    }
  }

  verificaTamanhoNome(retornoForm) {
    const nomeEhvalido = retornoForm.nome.length > 4;

    const erros = {
      nome: retornoForm.nome,
      valido: nomeEhvalido,
      mensagem: "nome deve ser maior do que 4 caracteres",
    };

    const validadeNome = erros.valido;
    return { validadeNome, erros };
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
