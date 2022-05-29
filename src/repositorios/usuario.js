const query = require("../infraestrutura/database/queries");

class Usuario {
  listarUsuarios() {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios";
    return query(sql);
  }

  buscarPorIdUsuario(id) {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  adicionaUsuario(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }

  alterarUsuario(id, valores) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }

  excluirUsuario(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  buscarPorNome(nome) {
    const sql =
      "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE nome like ?";
    return query(sql, "%" + nome + "%");
  }

  vericaNomeUsuario(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome = ?";
    return query(sql, nome).then((data) => {
      if (data.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  //Dados pessoais

  atualizarDadosPessoais(id, dadosPessoais) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [dadosPessoais, id]);
  }

  listarDadosPessoaisPorId(id) {
    const sql =
      "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  //Contatos

  atualizarContatos(id, contatos) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [contatos, id]);
  }

  listarContatosPorId(id) {
    const sql = "SELECT telefone, celular, email FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  //Senha

  atualizarSenha(id, novaSenha) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [novaSenha, id]);
  }

  //Endereço

  listarEnderecoPorId(id) {
    const sql =
      "SELECT cep, endereco, numero, complemento, bairro FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  atualizarEndereco(id, endereco) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [endereco, id]);
  }
}
module.exports = new Usuario();
