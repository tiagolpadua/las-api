const usuariosMock = require("./usuario.json");
const dadosPessoaisMock = require("./dadosPessoais.json");
const contatosMock = require("./contatos.json");
const enderecoMock = require("./endereco.json");

class Usuario {

  listar(){
    return Promise.resolve(usuariosMock);
  }

  buscarPorId(id){
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  buscarPorNome(nome){
    return Promise.resolve(usuariosMock.find((usuario) => usuario.nome === nome));
  }

  adicionar(usuario){
    return Promise.resolve(usuario && {insertId: 99});
  }

  async isNomeUsuarioUtilizado(nome){
    return Promise.resolve(!!usuariosMock.find((usuario) => usuario.nome === nome));
  }

  // eslint-disable-next-line no-unused-vars
  alterar(id, dadosAtualizados){
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }
  
  excluir(id){
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  // Dados Pessoais
  listarDadosPessoais(id){
    return Promise.resolve(dadosPessoaisMock[id-1]);
  }

  // eslint-disable-next-line no-unused-vars
  alterarDadosPessoais(id, dadosPessoaisAtualizados) {
    if(id > dadosPessoaisMock.length){
      return Promise.resolve({affectedRows: 0});
    }
    return Promise.resolve({affectedRows: 1});
  }

  // // Contatos
  listarContatos(id) {
    return Promise.resolve(contatosMock[id-1]);
  }

  // eslint-disable-next-line no-unused-vars
  alterarContatos(id, dadosContatosAtualizados){
    if(id > contatosMock.length){
      return Promise.resolve({affectedRows: 0});
    }
    return Promise.resolve({affectedRows: 1});
  }


  // // Senha
  alterarSenha(id, dadosSenhaAtualizada) {

    if(id && dadosSenhaAtualizada){
      return Promise.resolve({affectedRows: 1});
    }
    return Promise.resolve({affectedRows: 0});
  }


  // // Endereço
  listarEndereco(id){
    return Promise.resolve(enderecoMock[id-1]);
  }

  // eslint-disable-next-line no-unused-vars
  alterarEndereco(id, dadosEnderecoAtualizada){
    if(id > enderecoMock.length){
      return Promise.resolve({affectedRows: 0});
    }
    return Promise.resolve({affectedRows: 1});
  }

}

module.exports = new Usuario();