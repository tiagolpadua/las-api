const executaQuery = require("../infraestrutura/queries");

class Usuarios {
  listar() {
    const sql = "SELECT * FROM Usuarios";
    return executaQuery(sql);
  }
  buscarPorId(id) {
    const sql = "SELECT * FROM Usuarios WHERE id = ?";
    return executaQuery(sql, id);
  }
  async adicionar(usuario) {
    const nomeEhValido =
      usuario.nome.length > 0 &&
      (await this.validarNomeUsuarioNaoUtilizado(usuario.nome));

    const urlEhValida = await this.validarURLFotoPerfil(usuario.urlFotoPerfil);

    const validacoes = [
      {
        nome: "nome",
        valido: nomeEhValido,
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "urlFotoPerfil",
        valido: urlEhValida,
        mensagem: "URL deve uma URL válida",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      return new Promise.reject(erros);
    } else {
      const sql = "INSERT INTO Usuarios SET ?";
      return executaQuery(sql, usuario);
    }
  }
}

module.exports = new Usuarios();
