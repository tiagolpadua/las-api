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

  // incluirTipoVenda(retornoForm) {
  //   const sql = "INSERT INTO las.tiposVendas SET ?";

  //   return query(sql, retornoForm);
  // }

  // alterarTipoVenda(id, retornoForm) {
  //   const sql = "UPDATE las.tiposVendas SET ? WHERE id = ?";
  //   return query(sql, [retornoForm, id]);
  // }

  // excluirTipoVenda(id) {
  //   const sql = "DELETE FROM las.tiposVendas WHERE id = ?";

  //   return query(sql, id);
  // }

  // validarNomeVendasNaoUtilizado(retornoForm) {
  //   const sql = "SELECT * FROM las.tiposVendas WHERE descricao = ?";

  //   return query(sql, retornoForm);
  // }
}

module.exports = new TiposVendas();
