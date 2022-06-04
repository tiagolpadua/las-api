// const query = require("../infraestrutura/database/queries");

const usuariosMock = require("./usuarios");

class Usuario {
  adicionar(usuario) {
    return Promise.resolve(usuario && { insertId: 99});
  }

  listar() {
    return Promise.resolve(usuariosMock);
  }

  buscarPorId(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));    
  }

  isNomeUsuarioUtilizado(nome) {
    return Promise.resolve(
      !!usuariosMock.find((usuario) => usuario.nome === nome));  
  }

  buscarPorNome(nome) {
    return Promise.resolve(usuariosMock.filter((usuario) => usuario.nome === nome));    
  }
  
}

module.exports = new Usuario();