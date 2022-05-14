const repositorios = require("../repositorios/tipoVenda");

class TipoVenda {
  listar() {
    return repositorios.listar();
  }
  listarPorId(id) {
    return repositorios.listarPorId(id);
  }

  adicionar(tipoVenda) {
    const descricao = tipoVenda.descricao;
    if (descricao.length >= 5) {
      return repositorios.adicionar(tipoVenda);
    } else {
      throw new Error({
        message: "Descrição menor que o caracteres permitido.",
      });
    }
  }

  atualizar(id, tipoVenda) {
    const descricao = tipoVenda.descricao;
    if (descricao.length >= 5) {
      return repositorios.alterar(id, tipoVenda);
    } else {
      throw new Error({
        message: "Descrição menor que o caracteres permitido.",
      });
    }
  }

  deletar(id) {
    return repositorios.deletar(id);
  }
}

module.exports = new TipoVenda();
