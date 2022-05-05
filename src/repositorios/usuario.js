const query = require("../infraestrutura/database/queries");

class Usuario {
  listar() {
    const sql = "SELECT * FROM Usuarios";
    return query(sql);
  }
  adicionar(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }

  alterar(id, usuario) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query (sql, [id, usuario]);
  }
  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
  buscaPorId(id) {
    const sql = "SELECT * FROM Usuarios WHERE id = ?";
    return query (sql, id);
  }
  buscaPorNome(id, nome){
    const sql = "SELECT * FROM Usuarios WHERE nome like ?";
    return query (sql, nome);
  }
}

module.exports = new Usuario();
