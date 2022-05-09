const repositorio = require("../repositorios/tiposVendas");

class TiposVendas {
  listarTiposVendas() {
    return repositorio.listar();
  }

  buscaPorId(id) {
    return repositorio.buscaPorId(id);
  }

  async adicionar(tipoVenda) {
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
      return repositorio.adicionar(tipoVenda).then((resultados) => {
        const id = resultados.insertId;
        return { ...tipoVenda, id };
      });
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
