const eventosMock = require("./mockEventos.json");

class TiposVendas {
  listar() {
    return Promise.resolve(eventosMock);
  }
  adicionar(venda) {
    return Promise.resolve(venda && { insertId: 1 });
  }
  alterar(id) {
    return Promise.resolve(eventosMock.find((usuario) => usuario.id == id));
  }
  excluir(id) {
    return Promise.resolve(eventosMock.find((usuario) => usuario.id == id));
  }
  buscaPorId(id) {
    return Promise.resolve(eventosMock.find((usuario) => usuario.id === id));
  }
}

module.exports = new TiposVendas();
