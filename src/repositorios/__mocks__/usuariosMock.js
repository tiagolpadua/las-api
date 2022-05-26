const usuariosMock = require("./mockUsuario");

class Usuario {
  listar() {
    return Promise.resolve(usuariosMock);
  }
  adicionar(usuario) {
    return Promise.resolve(usuario && { insertId: 3 });
  }

  isNomeUsuarioUtilizado(nome) {
    return Promise.resolve(
      !!usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }
  alterar(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id == id));
  }
  excluir(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id == id));
  }
  buscaPorId(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }
  buscaPorNome(nome) {
    return Promise.resolve(
      usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }

  // //dados-pessoais
  // listaDadosPessoais(id) {
  //   const sql =
  //     "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
  //   return query(sql, id);
  // }

  // alterarDadosPessoais(id, valores) {
  //   const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //   return query(sql, [id, valores]);
  // }

  // //contatos
  // listaContatos(id) {
  //   const sql = "SELECT telefone, celular, email FROM Usuarios WHERE id = ?";
  //   return query(sql, id);
  // }

  // alterarContatos(id, valores) {
  //   const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //   return query(sql, [id, valores]);
  // }

  // //endereco
  // listaEndereco(id) {
  //   const sql =
  //     "SELECT cep, endereco, numero, complemento FROM Usuarios WHERE id = ?";
  //   return query(sql, id);
  // }

  // alterarEndereco(id, valores) {
  //   const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //   return query(sql, [id, valores]);
  // }
  // //senha
  // alterarSenha(id, senha) {
  //   const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //   return query(sql, [senha, id]);
  // }
}

module.exports = new Usuario();
