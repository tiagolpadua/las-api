const conexao = require("../infraestrutura/conexao");
 const fetch = require("node-fetch");


class Usuario {
 async adiciona(usuario, res) {
    const sql = "INSERT INTO Usuarios SET ?";
    const urlValida = await this.validarURLFotoPerfil(usuario.urlFotoPerfil);
    const nomeValido = await this.validarNomeUsuarioNaoUtilizado(usuario.nome);

    if(!urlValida){
      res.status(400).json("Url Inválida");
    }else if(!nomeValido){
      res.status(400).json("Nome Não Disponível");
    }else{
      conexao.query(sql, usuario, (erro) => {
        if (erro) {
          console.log("Usuario não foi adcionado");
          res.status(400).json(erro);
        } else {
          console.log("Usuário foi adicionado");
          res.status(201).json(usuario);
        }
      });
    }
  }

  lista(res) {
    const sql = "SELECT * FROM Usuarios";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

    conexao.query(sql, (erro, resultados) => {
      const atendimento = resultados[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }

  buscaPorNome(nome, res){
    nome = "'%" + nome + "%'";

    const sql = `SELECT * FROM usuarios WHERE nome LIKE ${nome}`;

    conexao.query(sql, (erro, resultados) => {
      if(erro){
        res.status(400).json(erro);
      }else{
        res.status(200).json(resultados);
      }
    });
  }

  altera(id, valores, res) {
    const sql = "UPDATE Atendimentos SET ? WHERE id=?";

    conexao.query(sql, [valores, id], (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }

  deleta(id, res) {
    const sql = "DELETE FROM Atendimentos WHERE id=?";

    conexao.query(sql, id, (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }

  async validarURLFotoPerfil(url){
    try {
      const expressao = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/.]))?/;

      const regex = new RegExp(expressao);

      if(url.match(regex)){
        const res = await fetch(url);
        return res.status == 200 ? true : false;
      }else{
        return false;
      }
    }catch(erro){
      return false;
    }
  }

  validarNomeUsuarioNaoUtilizado(nome){
    const sql = "SELECT * FROM usuarios WHERE nome = ?";

    return new Promise((resolve, reject) => {
      conexao.query(sql, nome, (erro, resultado) => {
        if(erro){
          reject(erro);
        }else{
          resolve(resultado.length > 0 ? false : true);
        }
      });      
    });
  }

}

module.exports = new Usuario();
