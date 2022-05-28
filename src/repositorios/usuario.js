const query = require("../infraestrutura/database/queries");

class Usuario {
  adicionar({ nome, urlFotoPerfil }) {
    const sql = "INSERT INTO usuarios SET ?";
    return query(sql, { nome, urlFotoPerfil });
  }

  listar() {
    const sql = "SELECT * FROM usuarios";
    return query(sql);
  }

  buscarPorId(id) {
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    return query(sql, id).then((data) => data[0]);
  }

  alterar(id, usuarioAlterado) {
    const sql = "UPDATE usuarios SET ? WHERE id = ?";
    return query(sql, [usuarioAlterado, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  buscarPorNome(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome like ?";
    return query(sql, nome);
  }

  async isNomeUsuarioUtilizado(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome = ?";
    return query(sql, nome).then((data) => {
      if (data.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }
}

module.exports = new Usuario();
