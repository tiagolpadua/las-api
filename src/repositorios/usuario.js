const query = require("../infraestrutura/database/queries");

class Usuario {
  listar() {
    const sql = "SELECT * FROM Usuarios";
    return query(sql);
  }
  buscarPorId(id) {
    const sql = "SELECT * FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
  adicionar(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }
  alterar(id, valores) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [id, valores]);
  }
  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
  buscarPorNome(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome like ?";
    return query(sql, nome);
  }
  ///Atualização e consulta de dados pessoais

  consultarDadosPessoais(id) {
    const sql =
      "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
  atualizarDadosPessoais(id, dadosPessoais) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [id, dadosPessoais]);
  }

  //Atualização e consulta de contatos

  consultaContatos(id) {
    const sql = "SELECT telefone, celular, email FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
  atualizarContatos(id, dadosContatos) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [id, dadosContatos]);
  }

  //Inclusão e consulta de endereço

  consultarEndereco(id) {
    const sql =
      "SELECT cep, endereco, numero, complemento, bairro FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
  alterarEndereco(id, dadosEndereco) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [id, dadosEndereco]);
  }
}
module.exports = new Usuario();
