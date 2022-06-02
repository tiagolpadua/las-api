const query = require("../infraestrutura/database/queries");

class Usuario {
  listar() {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios";
    return query(sql);
  }

  adiciona(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }

  async buscaPorId(id) {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE id = ?";
    const resultados = await query(sql, id);
    return resultados[0];
  }

  alterar(id, usuarioAtualizado) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [usuarioAtualizado, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  buscarPorNome(nome) {
    nome = "%" + nome + "%";
    const sql =
      "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE nome like ?";
    return query(sql, nome);
  }

  async buscarDadosPessoais(id) {
    const sql =
      "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
    const resultados = await query(sql, id);
    return resultados[0];
  }

  atualizarDadosPessoais(id, dadosPessoais) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [dadosPessoais, id]);
  }

  async buscarContatos(id) {
    const sql = "SELECT telefone, celular, email FROM Usuarios WHERE id = ?";
    const resultados = await query(sql, id);
    return resultados[0];
  }

  atualizarContatos(id, contatos) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [contatos, id]);
  }

  atualizarSenha(id, senha) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [senha, id]);
  }

  async buscarEndereco(id) {
    const sql =
      "SELECT cep, endereco, numero, complemento, bairro FROM Usuarios WHERE id = ?";
    const resultado = await query(sql, id);
    return resultado[0];
  }

  atualizarEndereco(id, endereco) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [endereco, id]);
  }

  async isNomeUsuarioUtilizado(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome = ?";

    query(sql, nome, (erro, resultados) => {
      if (erro) {
        throw erro;
      } else {
        return resultados.length > 0 ? true : false;
      }
    });
  }
}

module.exports = new Usuario();
