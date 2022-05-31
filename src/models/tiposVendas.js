const repositorio = require("../repositorios/tiposVendas");

class TiposVendas {
  listar() {
    return repositorio.listarTiposVendas();
  }

  buscarPorId(id) {
    return repositorio.buscarPorIdTiposVendas(id);
  }

  incluir(tipoVenda) {
    return repositorio.incluirTiposVendas(tipoVenda);
  }

  alterar(id, valores) {
    return repositorio
      .alterarTiposVendas(id, valores)
      .then((resultado) =>
        resultado.changedRows > 0
          ? { resultado: "Alteração feita com sucesso" }
          : resultado
      );
  }

  excluir(id) {
    return repositorio.excluirTiposVendas(id);
  }
}

module.exports = new TiposVendas();
