const query = require("../infraestrutura/database/queries");

class Usuario {
  listarUsuarios() {
    const sql = "SELECT id, nome , urlFotoPerfil FROM las.usuarios";

    return query(sql);
  }

  buscaUsuarioId(retornoId) {
    const sql =
      "SELECT id, nome , urlFotoPerfil FROM las.usuarios WHERE id = ?";

    return query(sql, retornoId);
  }

  incluirUsuarios(retornoForm) {
    const sql = "INSERT INTO las.usuarios SET ?";

    return query(sql, retornoForm);
  }

  buscaUsuarioPeloNome(retornoForm) {
    const sql =
      "SELECT id, nome , urlFotoPerfil FROM las.usuarios WHERE nome like ?";

    return query(sql, "%" + retornoForm + "%");
  }

  alterarUsuario(id, retornoForm) {
    const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
    return query(sql, [retornoForm, id]);
  }

  excluirUsuario(id) {
    const sql = "DELETE FROM las.usuarios WHERE id = ?";

    return query(sql, id);
  }

  //Dados Pessoais

  buscaDadosPessoaisId(retornoId) {
    const sql =
      "SELECT nomeCompleto, dataNascimento , rg, cpf FROM las.usuarios WHERE id = ?";

    return query(sql, retornoId);
  }

  alterarDadosPessoais(id, retornoForm) {
    const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
    return query(sql, [retornoForm, id]);
  }

  //fim Dados Pessoais

  // Contatos

  buscaContatosId(retornoId) {
    const sql =
      "SELECT telefone, celular , email FROM las.usuarios WHERE id = ?";

    return query(sql, retornoId);
  }

  alterarContatos(id, retornoForm) {
    const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
    return query(sql, [retornoForm, id]);
  }

  // fim Contatos

  // Senha

  alterarSenha(id, retornoForm) {
    const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
    return query(sql, [retornoForm, id]);
  }

  // fim Senha

  // Endereco

  buscaEnderecoId(retornoId) {
    const sql =
      "SELECT cep, endereco , numero, complemento, bairro FROM las.usuarios WHERE id = ?";

    return query(sql, retornoId);
  }

  alterarEndereco(id, retornoForm) {
    const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
    return query(sql, [retornoForm, id]);
  }

  // fim Endereco

  // inicio query de validação

  validarNomeUsuarioNaoUtilizado(retornoForm) {
    const sql = "SELECT nome FROM las.usuarios WHERE nome = ?";

    return query(sql, retornoForm);
  }

  validarNomeUsuarioNaoUtilizadoPUT(id, retornoForm) {
    const sql = "SELECT * FROM las.usuarios WHERE id != ? AND nome = ?";

    return query(sql, [id, retornoForm]);
  }

  // fim query de validação
}

module.exports = new Usuario();
