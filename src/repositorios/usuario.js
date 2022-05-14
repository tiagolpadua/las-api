const executaQuery = require("../infraestrutura/database/queries");

class Usuarios {
  listar() {
    const sql = "SELECT * FROM Usuarios";
    return executaQuery(sql);
  }

  buscarPorId(id) {
    const sql = "SELECT * FROM Usuarios WHERE id = ?";
    return executaQuery(sql, id)[0];
  }

  adicionar(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return executaQuery(sql, usuario);
  }

  async validarNomeUsuarioNaoUtilizado(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome = ?";
    return executaQuery(sql, nome);
  }

  alterar(id, valores) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return executaQuery(sql, [valores, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return executaQuery(sql, id);
  }

  buscarPorNome(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome like ?";
    return executaQuery(sql, nome);
  }
}

module.exports = new Usuarios();
