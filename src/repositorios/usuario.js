const query = require("../infraestrutura/database/queries");

class Usuario {
  constructor() {
    this.sqlBusca = "SELECT * FROM Usuarios";
    this.sqlBuscaPorNome = `${this.sqlBusca} WHERE nome`;
    this.sqlBuscaPorId = `${this.sqlBusca} WHERE id =`;
  }

  listar() {
    const sql = this.sqlBusca; //"SELECT * FROM Usuarios";

    return query(sql);
  }

  adicionar(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";

    return query(sql, usuario);
  }

  buscaPorId(id) {
    // const sql = "SELECT * FROM Usuarios WHERE id = ?";
    const sql = `${this.sqlBuscaPorId} ?`;

    return query(sql, id);
  }

  alterar(id, valores) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";

    return query(sql, [valores, id]);
  }

  buscaPorNome(nome) {
    const sql = `${this.sqlBuscaPorNome} LIKE ?`;

    return query(sql, `%${nome}%`);
  }

  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";

    return query(sql, id);
  }

  validarNomeNaoUtilizado(nome) {
    const sql = "SELECT COUNT(*) FROM Usuarios WHERE nome = ?";

    return query(sql, `'${nome}'`);
  }
}

module.exports = new Usuario();
