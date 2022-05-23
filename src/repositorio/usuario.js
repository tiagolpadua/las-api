const query = require("../infraestrutura/database/queries");

class Usuario {
  listar() {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios";
    return query(sql);
  }

  adiciona(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }

  async buscaPorId(id) {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE id = ?";
    const resultados = await query(sql, id);
    return resultados[0];
  }

  alterar(id, usuarioAtualizado) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [usuarioAtualizado, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  buscarPorNome(nome) {
    nome = "%" + nome + "%";
    const sql =
      "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE nome like ?";
    return query(sql, nome);
  }

  buscarDadosPessoais(id) {
    const sql =
      "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  atualizarDadosPessoais(id, dadosPessoais) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [dadosPessoais, id]);
  }

  async isNomeUsuarioUtilizado(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome = ?";

    query(sql, nome, (erro, resultados) => {
      if (erro) {
        throw erro;
      } else {
        if (resultados.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    });
  }
}

module.exports = new Usuario();
