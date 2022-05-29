const query = require("../infraestrutura/database/queries");
//const pool = require("../infraestrutura/database/conexao");

class Usuario {
  listar() {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios";
    return query(sql);
  }
  buscarPorId(id) {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE id = ?";
    return query(sql, id).then((data) => data[0]);
  }
  adicionarUsuario(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }

  isNomeUsuarioUtilizado(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome = ?";
    return query(sql, nome).then((data) => {
      if (data.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  alterarId(id, novoId) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [novoId, id]);
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
  obterDadosPessoais(id) {
    const sql =
      "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
  atualizarDadosPessoais(id, dadosPessoais) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [dadosPessoais, id]);
  }
  obterContatos(id) {
    const sql = "SELECT telefone, celular, email FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
  atualizarContatos(id, contatos) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [contatos, id]);
  }
  obterEndereco(id) {
    const sql =
      "SELECT cep, endereco, numero, complemento, bairro FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
  atualizarEndereco(id, endereco) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [endereco, id]);
  }
  atualizarSenha(id, senha) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [senha, id]);
  }
}

module.exports = new Usuario();
