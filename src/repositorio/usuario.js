const query = require("../infraestrutura/database/queries");

class Usuario {
  listar() {
    const sql = "SELECT * FROM Usuarios";
    return query(sql);
  }

  adiciona(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }

  buscarPorId(id) {
    const sql = "SELECT * FROM Usuarios WHERE id=?";
    return query(sql, id);
  }

  alterar(id, usuarioAtualizado) {
    const sql = "UPDATE Usuarios SET ? WHERE id=?";
    return query(sql, [id, usuarioAtualizado]);
  }

  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id=?";
    return query(sql, id);
  }

  buscarPorNome(nome) {
    nome = "%" + nome + "%";
    const sql = "SELECT * FROM Usuarios WHERE nome like ?";
    return query(sql, nome);
  }
}

module.exports = new Usuario();
