const TIPOVENDAS_MOCKS = require("./TIPO_VENDAS.json");

class TiposVendas {
  listarTipoVenda() {
    return Promise.resolve(TIPOVENDAS_MOCKS);
  }

  buscaTipoVendaId(retornoId) {
    if (retornoId) {
      const tipoVenda = TIPOVENDAS_MOCKS.filter(
        (venda) => venda.id === retornoId
      );

      return Promise.resolve(tipoVenda);
    }

    return Promise.reject("Id tipos-vendas inválido");
  }

  incluirTipoVenda(retornoForm) {
    return Promise.resolve(retornoForm && { insertId: 4 });
  }

  validarNomeVendasNaoUtilizado(retornoForm) {
    const resultado = TIPOVENDAS_MOCKS.filter(
      (venda) => venda.descricao === retornoForm
    );

    return Promise.resolve(resultado);
  }

  alterarTipoVenda(id) {
    const resultado = TIPOVENDAS_MOCKS.filter((venda) => venda.id === id);
    return resultado.length
      ? Promise.resolve({ affectedRows: 1 })
      : Promise.resolve({ affectedRows: 0 });
  }

  excluirTipoVenda(id) {
    return this.checkDataBaseInsertion(id, TIPOVENDAS_MOCKS);
  }

  checkDataBaseInsertion(identifier, list) {
    const affectedRows = { affectedRows: 0 };

    if (identifier) {
      list.find((item) => item.id === identifier)
        ? (affectedRows.affectedRows = 1)
        : affectedRows;
      return Promise.resolve(affectedRows);
    }

    return Promise.reject("ID inválido");
  }
}

module.exports = new TiposVendas();
