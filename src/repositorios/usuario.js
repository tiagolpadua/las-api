const query = require("../infraestrutura/database/queries");

class Usuario {
  listar() {
    const sql = "SELECT * FROM Usuarios";
    return query(sql);
  }

  adicionar({ nome, urlFotoPerfil }) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, { nome, urlFotoPerfil });
  }
}

module.exports = new Usuario();
