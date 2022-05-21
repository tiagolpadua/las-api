//const query = require("../infraestrutura/database/queries");

const usuariosMock = require("./usuarios");

class Usuario {
    //ok
    listar() {
        return Promise.resolve(usuariosMock);
    }

     //ok
    buscarPorId(id) {
        return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
    }
  
    //ok
    adiciona(usuario){
        return Promise.resolve(usuario && {insertId:90});
    }
    
    //ok
    alterar(id, valores){
        return Promise.resolve(usuariosMock && [valores,id]);
    }

    //ok
    excluir(id){
        return Promise.resolve(usuariosMock && id);
    }

    //ok
    buscarPorNome(nome){
        return Promise.resolve(usuariosMock.find((usuario) => usuario.nomeCompleto === nome));
    }

    //ok
    listarDadosPessoais(id){
        Promise.resolve(usuariosMock.find((usuario) => {
            if(usuario.id === id){
                return usuario.nomeCompleto, usuario.rg, usuario.cpf, usuario.dataNascimento;
            }
        }));
    }
    
/*
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
    } */

    isNomeUsuarioUtilizado(nome) {
        return Promise.resolve(!!usuariosMock.find((usuario) => usuario.nomeCompleto === nome));
        
    }
}
module.exports = new Usuario();
