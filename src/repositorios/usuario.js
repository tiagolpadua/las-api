const query = require("../infraestrutura/database/queries");

class Usuario {
  listarUsuarios() {
    const sql = "SELECT * FROM Usuarios";
    return query(sql);
  }

  buscarPorIdUsuario(id) {
    const sql = "SELECT * FROM Usuarios WHERE id = ?";
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
    const sql = "SELECT * FROM Usuarios WHERE nome like ?";
    return query(sql, "%" + nome + "%");
  }
}
module.exports = new Usuario();
