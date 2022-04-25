const conexao = require("../infraestrutura/conexao");
const fetch = require("node-fetch");

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

  buscaUsuarioPeloNome(nome, res) {
    const sql = `SELECT * FROM Usuarios WHERE nome like %${nome}%`;

    conexao.query(sql, nome, (erro, resultados) => {
      const usuarios = resultados[0];

      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuarios);
      }
    });
  }

  validaResourceUrl(urlFotoPerfil) {
    var expressao = /(https?:\/\/.*\.(?:png|jpg))/i;
    var regex = new RegExp(expressao);

    return urlFotoPerfil.match(regex);
  }

  async validarURLFotoPerfil(urlFotoPerfil) {
    try {
      const resposta = await fetch(urlFotoPerfil);
      if (resposta.status === 200) {
        return true;
      }
    } catch (erro) {
      return false;
    }

    return this.validaResourceUrl(urlFotoPerfil);
  }

  validarNomeUsuarioNaoUtilizado(nome) {
    const sql = "SELECT nome FROM Usuarios WHERE nome = ?";

    conexao.query(sql, nome, (erro, resultados) => {
      const usuario = resultados[0];

      if (usuario.nome === nome) {
        return undefined;
      } else {
        return "usuário pode ser criado";
      }
    });
  }
}

module.exports = new Usuario();
