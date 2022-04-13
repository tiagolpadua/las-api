const conexao = require("../infraestrutura/conexao");

class Usuario{
    adiciona(usuario){
        const sql = "INSERT INTO Usuarios SET ?";

        conexao.query(sql, usuario, (erro, resultados) => {
            if(erro){
                console.log("Usuario não foi adcionado");
                console.log(erro);
            }else{
                console.log("Usuário foi adicionado");
                console.log(resultados);
            }
        });
    }

    lista(res){
        const sql = "SELECT * FROM Usuarios";

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                console.log("Erro ao listar os usuarios");
                res.status(400).json(erro);
            }else{
                console.log("Lista de usuário:");
                res.status(200).json(resultados);
            }
        });
    }

    buscaId(id, res){
        const sql = "SELECT * FROM Usuarios WHERE id=${id}";

        conexao.query(sql, id, (erro, resultados) => {
            const usuario = resultados[0];
            if(erro){
                console.log("Erro ao buscar o ID");
                res.status(400).json(erro);
            }else{
                console.log("Buscou o ID");
                res.status(200).json(usuario);
            }
        });
    }

    deleta(id, res){
        const sql = "DELETE * FROM Usuarios WHERE id=?";

        conexao.query(sql, id, (erro, resultado) => {
            if(erro){
                console.log("Deu erro");
                res.status(400).json(erro);
            }else{
                console.log("Excluido com Sucesso");
                res.status(200).json(resultado);
            }
        });
    }
}

module.exports = new Usuario;