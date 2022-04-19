const conexao = require("../infraestrutura/conexao");
const fetch = require("node-fetch");

class Usuario{


    async adiciona(usuario, res){
        const sql = "INSERT INTO Usuarios SET ?";
        const validaNome = await this.validarNomeUsuarioNaoUtilizado(usuario.nome);
        const validaUrl = await this.validarURLFotoPerfil(usuario.url);

        if(!validaUrl){
            res.status(400).json("Essa URL é inválida");
        }else if(!validaNome){
            res.status(400).json("Esse nome já está cadastrado");
        }else{
            
            conexao.query(sql, usuario, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro);
                }else{
                    res.status(201).json(resultados);
                }
            });
        }
    }

    listaPorId(id,res){

        const sql = `SELECT * FROM Usuarios WHERE id = ${id}`;

        conexao.query(sql, (erro, resultados) => {
            const usuario = resultados[0];
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(usuario);
                // res.status(200).json(usuario);
            }
        });
    }

    listaPorNome(nome,res){
        const sql = `SELECT * FROM Usuarios WHERE nome like '%${nome}%' `;

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        });
    }

    show(res){

        const sql = "SELECT * FROM Usuarios";

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        });
    }

    altera(id, valores, res){
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        });
    }

    deleta(id,res){
        const sql = "DELETE FROM Usuarios WHERE id = ?";

        conexao.query(sql, id, (erro) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(`ID DELETADO: {${id}}`);
            }
        });
    }

    validarNomeUsuarioNaoUtilizado(nome){
        
        return new Promise((res, err) => {
            const sql = "SELECT * FROM Usuarios WHERE nome = ?";
            conexao.query(sql, nome, (erro, result) => {
                if(erro){
                    err(erro);
                }else{
                    if(result.length > 0){
                        res(false);
                    }else{
                        res(true);
                    }
                }
            });
        });
    }

    async validarURLFotoPerfil(url){
        
        try {
            const expressão = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
            const regex = new RegExp(expressão);
 
            if(url.match(regex)){
                const res = await fetch(url);
                if(res.status === 200){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }catch(error){
            return false;
        }
    }


}

module.exports = new Usuario;