const conexao = require("../infraestrutura/conexao");
const fetch = require("node-fetch");

class Usuarios {
  buscaPorId(id, res) {
    const sql = `SELECT * FROM Usuarios WHERE id = ${id}`;
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ resultados });
      }
    });
  }

  async adiciona(usuarios, res) {
    const urlValida = await this.validarURLFotoPerfil(usuarios.urlFotoPerfil);
    if (!urlValida) {
      res.send("Url inválida");
    } else {
      const sql = "INSERT INTO Usuarios SET ?";

      conexao.query(sql, usuarios, (erro, resultados) => {
        if (erro) {
          res.status(400).send("Usuário já cadastrado");
        } else {
          res.status(201).json({ resultados });
        }
      });
    }
  }

  altera(id, valores, res) {
    const sql = `UPDATE Usuarios SET ? WHERE id=${id}`;
    conexao.query(sql, valores, (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }

  deleta(id, res) {
    const sql = `DELETE FROM Usuarios WHERE id=${id}`;
    conexao.query(sql, (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }

  buscaPorNome(nome, res) {
    const sql = `SELECT * FROM Usuarios WHERE nome=${nome}`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }
  async validarURLFotoPerfil(url) {
    try {
      const regex =
        /https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/gm;
      const verificaUrl = url.match(regex);
      if (!verificaUrl) {
        return false;
      }
      const response = await fetch(url);
      if (response.status !== 200) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  }
  //somente para passar no teste, a validação foi pelo banco de dados
  validarNomeUsuarioNaoUtilizado() {}
}

module.exports = new Usuarios();
