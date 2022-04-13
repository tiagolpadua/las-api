const conexao = require("../infraestrutura/conexao");

class Usuario{
    adiciona(usuario){
        const sql = "INSERT INTO Usuarios SET ?";

        conexao.query(sql, usuario, (erro, resultados) => {
            if(erro){
                console.log(erro);
            }else{
                console.log(resultados);
            }
        });
    }
}

module.exports = new Usuario;