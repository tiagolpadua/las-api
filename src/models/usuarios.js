const conexao = require("../infraestrutura/conexao");
const fetch = require("node-fetch");

class Usuario {
    buscaPorId(id, res){
        const sql = `SELECT * FROM usuarios WHERE ID=${id}`;

        conexao.query(sql, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }
    async adiciona(usuario, res){
        const urlValida = await this.validarURLFotoPerfil(
            usuario.urlFotoPerfil
          );

        if(!urlValida) {
            res.status(400).json("Url inválida");
        } else {
            const sql = "INSERT INTO usuarios SET ?";

            conexao.query(sql, usuario, (erro, resultado) => {
                if(erro){
                    res.status(400).json(erro);
                } else {
                    res.status(200).json(resultado);
                }
            });
        }
    }
    altera(id, valores, res){
        const sql = "UPDATE usuarios SET ? WHERE id = ?";

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }
    lista(res){
        const sql = "SELECT * FROM usuarios";

        conexao.query(sql, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }
    deleta(id, res){
        const sql = "DELETE FROM usuarios WHERE ID = ?";

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }
    buscaPorNome(nome, res){
        const sql = `SELECT * FROM usuarios WHERE NOME LIKE '%${nome}%'`;

        conexao.query(sql, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }
    async validarURLFotoPerfil(urlFotoPerfil){
        const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/ig;
        var urlValida = regex.test(urlFotoPerfil);
        let statusUrl;

        if(urlValida){
          try {
            statusUrl = await fetch(urlFotoPerfil);
            if(statusUrl.status === 200){
                return true;
            } else {
                return false;
            }
          }
          catch (erro) {
            return false;
          }
        } else{
            return false;
        }
    }    
}

module.exports = new Usuario;