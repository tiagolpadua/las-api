const usuariosMockados = require("./usuariosMock.json");
class Usuario {
  listar() {
    return Promise.resolve(usuariosMockados);
  }

  adiciona(usuario) {
    return Promise.resolve(usuario && { insertId: 99 });
  }

  buscaPorId(id) {
    return Promise.resolve(
      usuariosMockados.find((usuario) => usuario.id == id)
    );
  }

  async isNomeUsuarioUtilizado(nome) {
    return Promise.resolve(
      !!usuariosMockados.find((usuario) => usuario.nome == nome)
    );
  }

  //   alterar(id, usuarioAtualizado) {
  //     const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //     return query(sql, [usuarioAtualizado, id]);
  //   }

  //   excluir(id) {
  //     const sql = "DELETE FROM Usuarios WHERE id = ?";
  //     return query(sql, id);
  //   }

  //   buscarPorNome(nome) {
  //     nome = "%" + nome + "%";
  //     const sql =
  //       "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE nome like ?";
  //     return query(sql, nome);
  //   }

  //   buscarDadosPessoais(id) {
  //     const sql =
  //       "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
  //     return query(sql, id);
  //   }

  //   atualizarDadosPessoais(id, dadosPessoais) {
  //     const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //     return query(sql, [dadosPessoais, id]);
  //   }
}

module.exports = new Usuario();
