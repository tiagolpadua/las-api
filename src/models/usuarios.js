// const pool = require("../infraestrutura/database/conexao");
const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuarios");

class Usuarios {
  constructor() {
    this.validaSeNomeFoiUtilizado = async (retornoForm) => {
      const existeUsuario = await repositorio.validarNomeUsuarioNaoUtilizado(
        retornoForm
      );

      if (existeUsuario[0]?.nome === retornoForm.trim()) return !true;

      return !false;
    };

    this.validarURLFotoPerfil = async (retornoForm) => {
      const validadorUrl =
        /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/gi;
      const urlEhValida = validadorUrl.test(retornoForm);

      if (urlEhValida) {
        const response = await fetch(retornoForm);

        if (response.status === 200) return true;
        else return false;
      }

      return false;
    };

    this.verificaTamanhoNome = (tamanho) => {
      return tamanho > 4;
    };

    this.validarNomeUsuarioNaoUtilizadoPUT = async ({ id, retornoForm }) => {
      const existeUsuarioPUT =
        await repositorio.validarNomeUsuarioNaoUtilizadoPUT(id, retornoForm);

      console.log(existeUsuarioPUT);

      if (existeUsuarioPUT[0]?.nome === retornoForm.trim()) return !true;

      return !false;
    };

    this.valida = async (parametros) => {
      const validacoesComResultado = await Promise.all(
        this.validacoes.map(async (campo) => {
          const { nome } = campo;
          const parametro = parametros[nome];

          if (!parametro) return { ...campo, resultado: !true };

          const resposta = await campo.valido(parametro);

          return { ...campo, resultado: !resposta };
        })
      );

      return validacoesComResultado.filter((campo) => campo.resultado);
    };

    this.validacoes = [
      {
        nome: "url",
        valido: this.validarURLFotoPerfil,
        mensagem: "URL inválida!",
      },
      {
        nome: "nomeUsuario",
        valido: this.verificaTamanhoNome,
        mensagem: "usuário deve ter pelo menos cinco caracteres",
      },
      {
        nome: "existeUsuario",
        valido: this.validaSeNomeFoiUtilizado,
        mensagem: "usuário já existe na base de dados",
      },
      {
        nome: "existeUsuarioPUT",
        valido: this.validarNomeUsuarioNaoUtilizadoPUT,
        mensagem: "Usuario já existe na base de dados",
      },
    ];
  }

  listarUsuarios() {
    return repositorio.listarUsuarios().then((resultado) => resultado);
  }

  async incluirUsuarios(retornoForm) {
    const parametros = {
      nomeUsuario: retornoForm.nome.length,
      url: retornoForm.urlFotoPerfil,
      existeUsuario: retornoForm.nome,
    };

    const erros = await this.valida(parametros);

    const existemErros = erros.length;

    if (existemErros) {
      return new Promise((resolve, reject) => reject(erros));
    }

    return repositorio.incluirUsuarios(retornoForm).then((results) => {
      return { id: results.insertId, ...retornoForm };
    });
  }

  buscaUsuarioId(retornoForm) {
    return repositorio
      .buscaUsuarioId(retornoForm)
      .then((resultado) => resultado);
  }

  buscaUsuarioPeloNome(retornoUrl) {
    return repositorio.buscaUsuarioPeloNome(retornoUrl).then((resultado) => {
      return resultado;
    });
  }

  async alterarUsuario(id, retornoForm) {
    const parametros = {
      nomeUsuario: retornoForm.nome.length,
      // existeUsuario: retornoForm.nome,
      url: retornoForm.urlFotoPerfil,
      existeUsuarioPUT: { id, retornoForm: retornoForm.nome },
    };

    const erros = await this.valida(parametros);

    const existemErros = erros.length;

    if (existemErros) {
      return new Promise((resolve, reject) => reject(erros));
    }

    return repositorio
      .alterarUsuario(id, retornoForm)
      .then((resultado) => resultado);
  }

  excluirUsuario(retornoForm) {
    return repositorio.excluirUsuario(retornoForm);
  }
}

module.exports = new Usuarios();
