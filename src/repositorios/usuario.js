const query = require("../infraestrutura/database/queries");

class Usuario {
  adicionar(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }

  listar() {
    const sql = "SELECT * FROM Usuarios";
    return query(sql);
  }

  async atualizaUsuarioId(usuarioId, valores) {
    const sql = "UPDATE usuarios SET ? WHERE id = ?";
    console.log(valores);
    return query(sql, [valores, usuarioId]);
  }

  async buscarContatos(usuarioId) {
    const sql = "SELECT telefone, celular, email FROM usuarios WHERE id = ?";
    return query(sql,usuarioId);
  }

  async buscarPorNome(nome) {
    const sql = "SELECT * FROM usuarios WHERE nome = ?";
    return query(sql,nome);
  }

  async buscarPorId(id) {
    const sql =
      "SELECT id, nomeCompleto, dataNascimento, rg, cpf FROM usuarios WHERE id = ?";
    return query(sql, id).then((data) => data[0]);
}

// isNomeUsuarioUtilizado(nome) {
//     const sql = "SELECT * FROM usuarios WHERE nome = ?";
//     return query(sql, nome).then((data) => {
//         if (data.length > 0) {
//           return true;
//         } else {
//           return false;
//         }
//       });
//     }

    async atualizaContato(usuarioId, valores) {
      const sql = "UPDATE usuarios SET ? WHERE id = ?";
      return query(sql, [valores, usuarioId]);
    }

    async senhaUsuario(usuarioId, valores) {
      const sql = "UPDATE usuarios SET ? WHERE id = ?";
      return query(sql, [valores,usuarioId]);
    }

    async buscarEndereco(usuarioId) {
      const sql = "SELECT cep, endereco, numero, complemento, bairro FROM usuarios WHERE id = ?";
      return query(sql,usuarioId);
    }

    async atualizaEndereco(usuarioId, valores) {
      const sql = "UPDATE usuarios SET ? WHERE id = ?";
      return query(sql, [valores, usuarioId]);
    }
}

module.exports = new Usuario();