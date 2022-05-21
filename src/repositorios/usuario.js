const query = require("../infraestrutura/database/queries");

class Usuario{
    //ok
    listar(){
        const sql = "SELECT * FROM Usuarios";
        return query(sql);
    }

    //ok
    buscarPorId(id){
        const sql = "SELECT * FROM Usuarios WHERE id = ?";
        return query(sql,id).then((data)=> data[0]);
    }

    //ok
    adiciona(usuario){
        const sql = "INSERT INTO Usuarios SET ?";
        return query(sql,usuario);
    }

    //ok
    alterar(id, valores){
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql,[valores,id]);
    }

    //ok
    excluir(id){
        const sql = "DELETE FROM Usuarios WHERE id = ?";
        return query(sql,id);
    }

    //ok
    buscarPorNome(nome){
        nome = "%" + nome + "%";
        const sql = "SELECT * FROM Usuarios WHERE nomeCompleto like ?";
        return query(sql, nome);
    }

    //ok
    listarDadosPessoais(id){
        const sql = "SELECT nomeCompleto, rg, cpf, dataNascimento FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }

    //ok
    alterarDadosPessoais(id, valores){
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql,[valores,id]);
    }

    //ok
    listarContatos(id){
        const sql = "SELECT telefone, celular, email FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }

    //ok
    alterarContatos(id, valores){
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql,[valores,id]);
    }

    //ok
    alterarSenha(id, valores){
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql,[valores,id]);
    }

    //ok
    listarEndereco(id){
        const sql = "SELECT cep, endereco, numero, complemento, bairro FROM Usuarios WHERE id = ?";
        return query(sql, id);
    }

    //ok
    alterarEndereco(id, valores){
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";
        return query(sql,[valores,id]);
    }

    isNomeUsuarioUtilizado(nome) {
        const sql = "SELECT * FROM Usuarios WHERE nomeCompleto = ?";
        return query(sql, nome)
        .then(data=>{
            if (data.length > 0) {
                return true;
            } else {
                return false;
            }
        }); 
             
    }
}

module.exports = new Usuario();