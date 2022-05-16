// const pool = require("../infraestrutura/database/conexao");
const Validacoes = require("../infraestrutura/validacoes");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  //Refatoração - OK
  listar() {
    return repositorio.listar();
  }

  //Refatoração - OK
  buscaPorId(id) {
    return repositorio.buscaPorId(id);
  }

  //Refatoração - OK
  async adicionar(usuario) {
    const nomeEhValido =
      usuario.nome.length > 0 &&
      (await this.validarNomeUsuarioNaoUtilizado(usuario.nome));

    const urlEhValida = await Validacoes.validarUrl(usuario.urlFotoPerfil);

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
      return Promise.reject(erros);
    } else {
      return repositorio.adicionar(usuario).then((resultados) => {
        const id = resultados.insertId;
        return { ...usuario, id };
      });
    }
  }

  //Refatoração - OK
  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  //Refatoração - OK
  excluir(id) {
    return repositorio.excluir(id);
  }

  //Refatoração - OK
  buscaPorNome(nome) {
    return repositorio.buscaPorNome(nome);
  }

  //É necessário refatorar esta função
  // async validarNomeUsuarioNaoUtilizado(nome) {
  //   return new Promise((resolve) => {
  //     const sql = "SELECT * FROM Usuarios WHERE nome = ?";
  //     pool.query(sql, nome, (erro, resultados) => {
  //       if (erro) {
  //         resolve(false);
  //       } else {
  //         if (resultados.length > 0) {
  //           resolve(false);
  //         } else {
  //           resolve(true);
  //         }
  //       }
  //     });
  //   });
  // }

  async validarNomeUsuarioNaoUtilizado(nome) {
    return new Promise(() => {
      const resultado = this.repositorio.validarNomeNãoUtilizado(nome);
      return !resultado > 0;
    });
  }
}

module.exports = new Usuarios();
