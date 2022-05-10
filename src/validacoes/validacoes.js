// const repositorio = require("../repositorios/usuarios");
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
