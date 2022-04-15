const res = require("express/lib/response");
const conexao = require ("../infraestrutura/conexao");

class Usuarios {
    lista(res){
        const sql = "SELECT * FROM Usuarios";
        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        });
    }
    
    buscaPorId(id, res){
        const sql = `SELECT * FROM Usuarios WHERE id=${id}`;
        
        conexao.query(sql, (erro, resultados) => {
            const usuario = resultados[0];

            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(usuario);
            }
        });
    }

    deleta(id, res){
        const sql = "DELETE FROM Usuarios WHERE id=?";

        conexao.query(sql, id, (erro) => { 
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            } 
        });
    }

    adiciona(usuario) {
        const sql = "INSERT INTO Atendimentos SET ?";

        conexao.query(sql, usuario, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }
    altera(id, res) {
            const sql = "UPDATE Usuarios SET ? WHERE id=?";
    
        conexao.query(sql, id, (erro, resultados) => { 
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            } 
        });
    
    }
}
module.exports = new Usuarios;