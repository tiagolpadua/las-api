
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
        // eslint-disable-next-line no-unused-vars
        const usuarios = usuariosMock.map(({ telefone,celular,email,urlFotoPerfil,senha,cep,endereco, numero,complemento,bairro, ...demais }) => demais);      
        const usuarioSelecionado= (usuarios.find((usuario) => usuario.id === id));
        return Promise.resolve(usuarioSelecionado);
    }
    
    //ok
    alterarDadosPessoais(id, valores){
        return Promise.resolve(usuariosMock && [valores,id]);
    }

    //ok
    listarContatos(id){
        // eslint-disable-next-line no-unused-vars
        const usuarios = usuariosMock.map(({nomeCompleto, rg, cpf, dataNascimento,urlFotoPerfil,senha,cep,endereco, numero,complemento,bairro, ...demais }) => demais);      
        const usuarioSelecionado= (usuarios.find((usuario) => usuario.id === id));
        return Promise.resolve(usuarioSelecionado);
    }

    //ok
    alterarContatos(id, valores){
        return Promise.resolve(usuariosMock && [valores,id]);
    }

    //ok
    alterarSenha(id, valores){
        return Promise.resolve(usuariosMock && [valores,id]);
    }

    //ok
    listarEndereco(id){
        // eslint-disable-next-line no-unused-vars
        const usuarios = usuariosMock.map(({nomeCompleto, rg, cpf, dataNascimento, telefone,celular,email,urlFotoPerfil,senha, ...demais }) => demais);      
        const usuarioSelecionado= (usuarios.find((usuario) => usuario.id === id));
        return Promise.resolve(usuarioSelecionado);
    }

    //ok
    alterarEndereco(id, valores){
        return Promise.resolve(usuariosMock && [valores,id]);
    } 

    isNomeUsuarioUtilizado(nome) {
        return Promise.resolve(!!usuariosMock.find((usuario) => usuario.nomeCompleto === nome));
        
    }
}
module.exports = new Usuario();
