const executaQuery = require("../infraestrutura/database/queries");

class Usuario {
  listar() {
    const sql = "SELECT * FROM Usuarios";
    return executaQuery(sql);
  }

  buscarPorId(id) {
    const sql = "SELECT * FROM Usuarios WHERE id = ?";
    return executaQuery(sql, id);
  }

  validarNome(nome) {
    const sql = "SELECT * FROM Usuarios WHERe nome =?";
    return executaQuery(sql, nome);
  }

  adicionar(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return executaQuery(sql, usuario);
  }

  buscarPorNome(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome like ?";
    return executaQuery(sql, "%" + nome + "%");
  }

  alterar(id, valores) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return executaQuery(sql, [valores, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return executaQuery(sql, id);
  }
}

module.exports = new Usuario();
