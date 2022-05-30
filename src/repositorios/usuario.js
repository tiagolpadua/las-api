const query = require("../infraestrutura/database/queries");

class Usuario {
  listar() {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios";
    return query(sql);
  }
  adicionar(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }

  alterar(id, valores) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }
  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
  async buscaPorId(id) {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE id = ?";
    const resultados = await query(sql, id);
    return resultados[0];
  }
  buscaPorNome(nome) {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE nome = ?";
    return query(sql, nome);
  }

  isNomeUsuarioUtilizado(nome) {
    const sql = "SELECT * FROM Usuarios WHERE nome = ?";
    return query(sql, nome).then((data) => {
      if (data.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  //dados-pessoais
  listaDadosPessoais(id) {
    const sql =
      "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  alterarDadosPessoais(id, valores) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }

  //contatos
  async listaContatos(id) {
    const sql = "SELECT telefone, celular, email FROM Usuarios WHERE id = ?";
    const resultados = await query(sql, id);
    return resultados[0];
  }

  alterarContatos(id, valores) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }

  //endereco
  listaEndereco(id) {
    const sql =
      "SELECT cep, endereco, numero, complemento FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  alterarEndereco(id, valores) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }
  //senha
  alterarSenha(id, senha) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [senha, id]);
  }
}

module.exports = new Usuario();
