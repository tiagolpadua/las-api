const query = require("../infraestrutura/database/queries");

class Usuario {
  listar() {
    const sql = "SELECT * FROM Usuarios";
    return query(sql);
  }
  buscarPorId(id) {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE id = ?";
    return query(sql, id).then((resultado) => resultado[0]);
  }
  adicionar({ nome, urlFotoPerfil }) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, { nome, urlFotoPerfil });
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
  alterarSenha(id, valores) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [valores, id]);
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

  isNomeUsuarioUtilizado(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome = ?";
    return query(sql, nome).then((data) => {
      if (data.length > 0) {
        return true;
      } else return false;
    });
  }
}

module.exports = new Usuario();
