// const query = require("../infraestrutura/database/queries");

const USUARIOS_MOCK = require("../__mocks__/USUARIOS.json");

class Usuario {
  listarUsuarios() {
    return Promise.resolve(USUARIOS_MOCK);
  }

  buscaUsuarioId(retornoId) {
    return Promise.resolve(
      USUARIOS_MOCK.filter((usuario) => usuario.id === retornoId)
    );
  }

  validarNomeUsuarioNaoUtilizado(retornoForm) {
    const existeEvento = USUARIOS_MOCK.filter(
      (usuario) => usuario.nome === retornoForm
    );

    return Promise.resolve(existeEvento);
  }

  incluirUsuarios(retornoForm) {
    return Promise.resolve(retornoForm && { insertId: 5 });
  }

  buscaUsuarioPeloNome(retornoForm) {
    return Promise.resolve(
      USUARIOS_MOCK.filter((usuario) => usuario.nome.includes(retornoForm))
    );
  }

  validarNomeUsuarioNaoUtilizadoPUT(id, retornoForm) {
    const existeUsuario = USUARIOS_MOCK.filter(
      (usuario) => usuario.nome === retornoForm && usuario.id !== id
    );

    return Promise.resolve(existeUsuario);
  }

  alterarUsuario(id, retornoForm) {
    return Promise.resolve(id, retornoForm);
  }

  excluirUsuario(id) {
    if (id) {
      const affectedRows = { affectedRows: 0 };
      USUARIOS_MOCK.find((usuario) => usuario.id === id)
        ? (affectedRows.affectedRows = 1)
        : (affectedRows.affectedRows = 0);
      return Promise.resolve(id && affectedRows);
    }

    return Promise.reject("ID inválido");
  }

  // //Dados Pessoais

  // buscaDadosPessoaisId(retornoId) {
  //   const sql =
  //     "SELECT nomeCompleto, dataNascimento , rg, cpf FROM las.usuarios WHERE id = ?";

  //   return query(sql, retornoId);
  // }

  // alterarDadosPessoais(id, retornoForm) {
  //   const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
  //   return query(sql, [retornoForm, id]);
  // }

  // //fim Dados Pessoais

  // // Contatos

  // buscaContatosId(retornoId) {
  //   const sql =
  //     "SELECT telefone, celular , email FROM las.usuarios WHERE id = ?";

  //   return query(sql, retornoId);
  // }

  // alterarContatos(id, retornoForm) {
  //   const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
  //   return query(sql, [retornoForm, id]);
  // }

  // // fim Contatos

  // // Senha

  // alterarSenha(id, retornoForm) {
  //   const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
  //   return query(sql, [retornoForm, id]);
  // }

  // // fim Senha

  // // Endereco

  // buscaEnderecoId(retornoId) {
  //   const sql =
  //     "SELECT cep, endereco , numero, complemento, bairro FROM las.usuarios WHERE id = ?";

  //   return query(sql, retornoId);
  // }

  // alterarEndereco(id, retornoForm) {
  //   const sql = "UPDATE las.usuarios SET ? WHERE id = ?";
  //   return query(sql, [retornoForm, id]);
  // }

  // // fim Endereco

  // // inicio query de validação

  // // fim query de validação
}

module.exports = new Usuario();
