const query = require("../infraestrutura/database/queries");

class Usuario {
  constructor() {
    this.sqlBusca = "SELECT id, nome, urlFotoPerfil FROM Usuarios";
    this.sqlBuscarPorNome = `${this.sqlBusca} WHERE nome`;
    this.sqlBuscarPorId = `${this.sqlBusca} WHERE id =`;
  }

  listar() {
    const sql = this.sqlBusca; //"SELECT * FROM Usuarios";

    return query(sql);
  }

  adicionar(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";

    return query(sql, usuario);
  }

  buscarPorId(id) {
    // const sql = "SELECT * FROM Usuarios WHERE id = ?";
    const sql = `${this.sqlBuscarPorId} ?`;

    return query(sql, id).then((data) => data[0]);
  }

  alterar(id, valores) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";

    return query(sql, [valores, id]);
  }

  buscaPorNome(nome) {
    const sql = `${this.sqlBuscarPorNome} LIKE ?`;

    return query(sql, `%${nome}%`);
  }

  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";

    return query(sql, id);
  }

  isNomeUsuarioUtilizado(nome) {
    const sql = "SELECT COUNT(*) FROM Usuarios WHERE nome = ?";

    return query(sql, `'${nome}'`);
  }
}

module.exports = new Usuario();
