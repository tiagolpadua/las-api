const conexao=require("../infraestrutura/conexao");

class Usuario{
    adiciona(usuario,res){
        const sql="Insert into usuario set ?";

        conexao.query(sql,usuario, (erro,resultados)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id,res){
        const sql =`SELECT * FROM usuario WHERE id=${id}`;

        conexao.query(sql,(erro,resultados) =>{
            const usuario=resultados[0];
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(usuario);
            }
        });
    }

    buscaPorNome(nome,res){
        const sql =`SELECT * FROM usuario WHERE nome='${nome}'`;

        conexao.query(sql,(erro,resultados) =>{
            const usuario=resultados[0];
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(usuario);
            }
        });
    }

    alterar(id,valores,res){
        
        const sql ="UPDATE usuario SET ?  WHERE id=?";

        conexao.query(sql,[valores,id],(erro,resultados) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        });
    }

    obter(res){
        const sql ="SELECT * FROM usuario";

        conexao.query(sql,(erro,resultados) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        });
    }
  
    delete(id,res){
        const sql="DELETE FROM usuario WHERE id=?";

        conexao.query(sql,id,(erro,resultados) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        });
    }
}
module.exports= new Usuario; 