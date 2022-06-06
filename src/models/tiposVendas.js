const repositorio = require("../repositorios/tiposVendas");

class TiposVendas {
  listar() {
    return repositorio.listar();
  }
  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }
  async incluir(tipoVenda) {
    const descricaoEhValida = tipoVenda.descricao.length > 4;

    const validacoes = [
      {
        nome: "descricao",
        valido: descricaoEhValida,
        mensagem:
          "Uma descrição deve ser informada, e possuir no mínimo 5 caracteres",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      return Promise.reject(erros);
    } else {
      const resp = await repositorio.incluir(tipoVenda);
      return { id: resp.insertId, ...tipoVenda };
    }
  }
  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }
  excluir(id) {
    return repositorio.excluir(id);
  }
}

module.exports = new TiposVendas();
