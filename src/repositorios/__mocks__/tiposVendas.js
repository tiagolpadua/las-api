// const query = require("../infraestrutura/database/queries");

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

      return Promise.resolve(retornoId && tipoVenda);
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

    console.log("VER RESULTADO TIPOVENDAS", resultado);

    return Promise.resolve(resultado);
  }

  alterarTipoVenda(id) {
    const resultado = TIPOVENDAS_MOCKS.filter((venda) => venda.id === id);
    return resultado.length
      ? Promise.resolve({ affectedRows: 1 })
      : Promise.resolve({ affectedRows: 0 });
  }

  excluirTipoVenda(id) {
    if (id) {
      const affectedRows = { affectedRows: 0 };
      TIPOVENDAS_MOCKS.find((venda) => venda.id === id)
        ? (affectedRows.affectedRows = 1)
        : (affectedRows.affectedRows = 0);
      return Promise.resolve(id && affectedRows);
    }

    return Promise.reject("ID inválido");
  }
}

module.exports = new TiposVendas();
