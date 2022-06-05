// const query = require("../infraestrutura/database/queries");

const usuariosMock = require("./usuarios.json");

class Usuario {
  listar() {
    return Promise.resolve(usuariosMock);
  }

  buscarPorId(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  adicionar(usuario) {
    return Promise.resolve(usuario && { insertId: 99 });
  }
  isNomeUsuarioUtilizado(nome) {
    return Promise.resolve(
      !!usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }

  // alterar(id, valores) {
  //   const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //   return query(sql, [id, valores]);
  // }
  // excluir(id) {
  //   const sql = "DELETE FROM Usuarios WHERE id = ?";
  //   return query(sql, id);
  // }
  // buscarPorNome(nome) {
  //   const sql = "SELECT * FROM Usuarios WHERE nome like ?";
  //   return query(sql, nome);
  // }
  // ///Atualização e consulta de dados pessoais

  // consultarDadosPessoais(id) {
  //   const sql =
  //     "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
  //   return query(sql, id);
  // }
  // atualizarDadosPessoais(id, dadosPessoais) {
  //   const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //   return query(sql, [id, dadosPessoais]);
  // }

  // //Atualização e consulta de contatos

  // consultaContatos(id) {
  //   const sql = "SELECT telefone, celular, email FROM Usuarios WHERE id = ?";
  //   return query(sql, id);
  // }
  // atualizarContatos(id, dadosContatos) {
  //   const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //   return query(sql, [id, dadosContatos]);
  // }

  // //Inclusão e consulta de endereço

  // consultarEndereco(id) {
  //   const sql =
  //     "SELECT cep, endereco, numero, complemento, bairro FROM Usuarios WHERE id = ?";
  //   return query(sql, id);
  // }
  // alterarEndereco(id, dadosEndereco) {
  //   const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //   return query(sql, [id, dadosEndereco]);
  // }
}
module.exports = new Usuario();
