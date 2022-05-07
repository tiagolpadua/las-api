const query = require("../infraestrutura/database/queries");

class Usuario {
  listarUsuarios() {
    const sql = "SELECT * FROM las.usuarios";

    return query(sql);
  }

  buscaUsuarioId(retornoId) {
    const sql = "SELECT * FROM las.usuarios WHERE id = ?";

    return query(sql, retornoId);
  }

  incluirUsuarios(retornoForm) {
    const sql = "INSERT INTO las.usuarios SET ?";

    return query(sql, retornoForm);
  }

  buscaUsuarioPeloNome(retornoForm) {
    const sql = "SELECT * FROM las.usuarios WHERE nome like ?";

    // "%" + retornoForm + "%";

    return query(sql, retornoForm + "%");
  }

  alterarUsuario(id, retornoForm) {
    const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
    return query(sql, [retornoForm, id]);
  }

  excluirUsuario(id) {
    const sql = "DELETE FROM las.usuarios WHERE id = ?";

    return query(sql, id);
  }

  // inicio query de validação

  validarNomeUsuarioNaoUtilizado(retornoForm) {
    const sql = "SELECT * FROM las.usuarios WHERE nome = ?";

    return query(sql, retornoForm);
  }

  validarNomeUsuarioNaoUtilizadoPUT(id, retornoForm) {
    const sql = "SELECT * FROM las.usuarios WHERE id != ? AND nome = ?";

    console.log(id, retornoForm);

    return query(sql, [id, retornoForm]);
  }

  // fim query de validação
}

module.exports = new Usuario();
