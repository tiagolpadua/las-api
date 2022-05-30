const query = require("../infraestrutura/database/queries");

class Usuario {
  adicionar({ nome, urlFotoPerfil }) {
    const sql = "INSERT INTO usuarios SET ?";
    return query(sql, { nome, urlFotoPerfil });
  }

  listar() {
    const sql = "SELECT id, nome, urlFotoPerfil FROM usuarios";
    return query(sql);
  }

  buscarPorId(id) {
    const sql = "SELECT id, nome, urlFotoPerfil FROM usuarios WHERE id = ?";
    return query(sql, id).then((data) => data[0]);
  }

  alterar(id, usuarioAlterado) {
    const sql = "UPDATE usuarios SET ? WHERE id = ?";
    return query(sql, [usuarioAlterado, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  buscarPorNome(nome) {
    const sql =
      "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE nome like ?";
    return query(sql, nome);
  }

  //dados pessoais
  atualizarDadosPessoais(id, dadosPessoais) {
    const sql = "UPDATE usuarios SET ? WHERE id = ?";
    return query(sql, [dadosPessoais, id]);
    // return query(sql, id); O DE TIAGO ESTAVA DESSA FORMA SE DER ERRO OU NÃO FUINCIONAR, VERIFICAR
  }

  obterDadosPessoais(id) {
    const sql =
      "SELECT nomeCompleto, dataNascimento, rg, cpf FROM usuarios WHERE id = ?";
    return query(sql, id).then((data) => data[0]);
  }

  async isNomeUsuarioUtilizado(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome = ?";
    return query(sql, nome).then((data) => {
      if (data.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  buscarContatos(id) {
    const sql = "SELECT telefone, celular, email FROM usuarios WHERE id = ?";
    return query(sql, id).then((data) => data[0]);
  }

  alterarContatos(id, usuarioAlterado) {
    const sql = "UPDATE usuarios SET ? WHERE id = ?";
    return query(sql, [usuarioAlterado, id]);
  }

  alterarSenha(id, senhaAlterada) {
    const sql = "UPDATE usuarios SET ? WHERE id = ?";
    return query(sql, [senhaAlterada, id]);
  }

  buscarEndereco(id) {
    const sql =
      "SELECT cep, endereco, numero, complemento, bairro FROM usuarios WHERE id = ?";
    return query(sql, id).then((data) => data[0]);
  }

  alterarEndereco(id, enderecoAlterado) {
    const sql = "UPDATE usuarios SET ? WHERE id = ?";
    return query(sql, [enderecoAlterado, id]);
  }
}

module.exports = new Usuario();
