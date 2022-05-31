const TiposVendasRepositorio = require("../repositorios/tiposVendas");

class TiposVendas {
  listar() {
    return TiposVendasRepositorio.listar();
  }

  async buscarPorId(id) {
    const encontrado = await TiposVendasRepositorio.buscarPorId(id);
    if (encontrado.length === 0) {
      return Promise.reject({
        tipoVenda: `tipo-venda com id ${id} não encontrado`,
      });
    }
    return encontrado;
  }

  async adicionar(tipoVenda) {
    const erros = this.isCamposInvalidos(tipoVenda);
    if (erros.length > 0) {
      return Promise.reject(erros);
    }
    return TiposVendasRepositorio.adicionar(tipoVenda);
  }

  async alterar(id, valores) {
    let resultados;
    const erros = this.isCamposInvalidos(valores);
    if (!this.isIdUltilizado(id)) {
      resultados = Promise.reject({ error: `ID :${id} não encontrado` });
    } else if (erros.length > 0) {
      resultados = Promise.reject(erros);
    } else {
      resultados = await TiposVendasRepositorio.alterar(id, valores);
    }
    return resultados;
  }

  async excluir(id) {
    if (!(await this.isIdUltilizado(id))) {
      return Promise.reject({ error: `ID :${id} não encontrado` });
    }
    return TiposVendasRepositorio.excluir(id);
  }

  async isIdUltilizado(id) {
    const encontrado = await TiposVendasRepositorio.buscarPorId(id);
    return encontrado.length > 0 ? true : false;
  }

  isCamposInvalidos(tipoVenda) {
    const validacoes = [
      {
        id: `${tipoVenda?.id}`,
        valido: tipoVenda?.id,
        mensagem: "tipoVenda deve conter um ID válido",
      },

      {
        descricao: `${tipoVenda?.descricao}`,
        valido: tipoVenda?.descricao,
        mensagem: "tipoVenda deve conter uma descrição válida",
      },
    ];
    const erros = validacoes.filter((campo) => !campo.valido);
    return erros;
  }
}

module.exports = new TiposVendas();
