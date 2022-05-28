//const { response } = require("express");
const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");
//const moment = require("moment");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(usuario) {
    let nomeEhValido = false;

    if (usuario.nome.length > 0) {
      const nomeJaUtilizado = await repositorio.isNomeUsuarioUtilizado(
        usuario.nome
      );

      if (!nomeJaUtilizado) {
        nomeEhValido = true;
      }
    }

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
      throw erros;
    } else {
      // const sql = "INSERT INTO Usuarios SET ?";

      // pool.query(sql, usuario, (erro) => {
      //   if (erro) {
      //     next(erro);
      //   } else {
      //     res.status(201).json(usuario);
      //   }
      // });
      const resp = await repositorio.adicionar(usuario);
      return { id: resp.insertId, ...usuario };
    }
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

  async validarURLFotoPerfil(url) {
    try {
      const regex =
        /https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/gm;
      const verificaUrl = url.match(regex);
      if (!verificaUrl) {
        return false;
      }
      const response = await fetch(url);
      if (response.status !== 200) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  }

  obterDadosPessoais(id) {
    return repositorio.obterDadosPessoais(id);
  }
  atualizarDadosPessoais(id, dadosPessoais) {
    return repositorio.atualizarDadosPessoais(id, dadosPessoais);
  }

  // isDatasValidas(dataInicio, dataFim) {
  //   //Obter a data atual - var now = moment();
  //   //var day = moment("1995-12-25")
  //   const objDataInicio = moment(dataInicio);
  //   const objDataFim = moment(dataFim);
  // }
}

module.exports = new Usuarios();
