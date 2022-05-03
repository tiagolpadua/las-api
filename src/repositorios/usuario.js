const query = require("../infraestrutura/database/queries");

class Usuario {
  adicionar(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }

  listar() {
    const sql = "SELECT * FROM Usuarios";
    return query(sql);
  }
}

module.exports = new Usuario();