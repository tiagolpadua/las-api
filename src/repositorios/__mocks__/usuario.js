const usuariosMock = require("../../../dados-mock/usuarios.json");
const dadosPessoaisMock = require("../../../dados-mock/dados-pessoais.json");

class Usuario {
  listar() {
    return Promise.resolve(usuariosMock);
  }

  alterar(id) {
    return Promise.resolve(usuariosMock[0] && { ...id });
  }

  adicionar(usuario) {
    return Promise.resolve(usuario && { insertId: 99 });
  }

  excluir(id) {
    return Promise.resolve(usuariosMock[id - 1].id);
    //return repositorio.excluir(id);
  }

  buscarPorNome(nome) {
    return Promise.resolve(
      usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }

  buscarPorId(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  async isNomeUsuarioUtilizado(nome) {
    return Promise.resolve(
      !!usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }

  //API DADOS PESSOAIS

  obterDadosPessoais(id) {
    return Promise.resolve(
      dadosPessoaisMock[id - 1] ? dadosPessoaisMock[id - 1] : []
    );
  }

  // eslint-disable-next-line no-unused-vars
  atualizarDadosPessoais(id, dadosPessoaisAlterado) {
    return Promise.resolve(dadosPessoaisMock[id - 1] && { ...id });
  }

  // alterar(id, usuarioAlterado) {
  //   const sql = "UPDATE usuarios SET ? WHERE id = ?";
  //   return query(sql, [usuarioAlterado, id]);
  // }

  // excluir(id) {
  //   const sql = "DELETE FROM Usuarios WHERE id = ?";
  //   return query(sql, id);
  // }

  // buscarPorNome(nome) {
  //   const sql = "SELECT * FROM Usuarios WHERE nome like ?";
  //   return query(sql, nome);
  // }
}

module.exports = new Usuario();
