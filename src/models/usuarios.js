
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

   async adiciona(usuario, res) {

        var idUsuario  = await this.validarNomeUsuarioNaoUtilizado(usuario.nome);        
        if (idUsuario > 0){
            res.status(400).json(`Usuário ${usuario.nome} cadastrado com o id ${idUsuario}.`);
        }else{
            const sql = "INSERT INTO Usuarios SET ?";        

            conexao.query(sql, usuario, (erro) => {
                if(erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(200).json(usuario);
                }
            });
        }

        
    }
    altera(id, valores, res) {
        
        const sql = "UPDATE Usuarios SET ? WHERE id=?";
    
        conexao.query(sql, [valores, id], (erro) => { 
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({...valores, id});
            }
        });
    
    }


    buscaPorNome(nome,res){
        const sql = `SELECT * FROM Usuarios WHERE nome like "%${nome}%"`;

        conexao.query(sql, (erro,resultados)=>{
            const usuarioProcurado = resultados;
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(usuarioProcurado);
            }
        });
    }

    validarNomeUsuarioNaoUtilizado(nome) {
        const sql = "SELECT * FROM usuarios WHERE nome = ?";        

        return new Promise((resolve, reject) => {                       
          conexao.query(sql, nome, (erro, resultados) => {
            if (erro) {
              reject(erro);
            } else {    
                if (resultados.length > 0){
                    resolve(resultados[0].id);
                }else{
                    resolve(0);
                }                                        
            }
          });
        });
      }
}
module.exports = new Usuarios;