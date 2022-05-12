const repositorioUsuario = require("../repositorios/usuarios");
const repositorioTipoVenda = require("../repositorios/tiposVendas");
const fetch = require("node-fetch");

class Validacao {
  async validarURLFotoPerfil(retornoForm) {
    const validadorUrl =
      /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/gi;
    const urlEhValida = validadorUrl.test(retornoForm);

    if (urlEhValida) {
      const response = await fetch(retornoForm);

      if (response.status === 200) return true;
      else return false;
    }

    return false;
  }

  verificaTamanhoNome(tamanho) {
    return tamanho > 4;
  }

  //Validacoes Usuarios

  async validarNomeUsuarioNaoUtilizadoPUT({ id, retornoForm }) {
    const existeUsuarioPUT =
      await repositorioUsuario.validarNomeUsuarioNaoUtilizadoPUT(
        id,
        retornoForm
      );

    if (existeUsuarioPUT[0]?.nome === retornoForm.trim()) return !true;

    return !false;
  }

  async validaSeNomeFoiUtilizado(retornoForm) {
    const existeUsuario =
      await repositorioUsuario.validarNomeUsuarioNaoUtilizado(retornoForm);

    if (existeUsuario[0]?.nome === retornoForm.trim()) return !true;

    return !false;
  }

  // fim validacao usuarios

  //Validacoes Tipo vendas

  async validaSeDescricaoFoiUtilizado(retornoForm) {
    const existeUsuario =
      await repositorioTipoVenda.validarNomeVendasNaoUtilizado(retornoForm);

    if (existeUsuario[0]?.descricao === retornoForm.trim()) return !true;

    return !false;
  }

  // fim validacao Tipo vendas

  //Validacoes Eventos

  // fim validacao Eventos

  async valida(parametros) {
    const validacoesComResultado = await Promise.all(
      this.validacoes.map(async (campo) => {
        const { nome } = campo;
        const parametro = parametros[nome];

        if (!parametro) return { ...campo, resultado: !true };

        const resposta = await campo.valido(parametro);

        console.log(nome, resposta);

        return { ...campo, resultado: !resposta };
      })
    );

    return validacoesComResultado.filter((campo) => campo.resultado);
  }
}

module.exports = new Validacao();
