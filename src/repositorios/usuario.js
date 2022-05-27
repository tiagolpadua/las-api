const query = require("../infraestrutura/database/queries.js");

class UsuarioRepositorio {
  listar() {
    const sql = "SELECT * FROM Usuarios";
    return query(sql);
  }
  buscarPorId(id) {
    const sql = "SELECT * FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
  adicionar(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }
  alterar(valores, id) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }
  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
  buscarPorNome(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome LIKE ?";
    return query(sql, nome);
  }

  
  // dados pessoais

  listarDadosPessoais(id) {
    const sql = `SELECT 
    nomeCompleto, dataNascimento, rg, cpf 
    from Usuarios WHERE id = ?`;

    return query(sql, id);
  }

  alterarDadosPessoais(valores, id) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }

  // contatos

  listarContatos(id) {
    const sql = `SELECT 
    telefone, celular, email
    from Usuarios WHERE id = ?`;

    return query(sql, id);
  }

  alterarContatos(valores, id) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }

  // senha

  alterarSenha(senha, id) {
    const sql = "UPDATE Usuarios SET senha = ? WHERE id = ?";
    return query(sql, [senha, id]);
  }
  
}

module.exports = new UsuarioRepositorio();
