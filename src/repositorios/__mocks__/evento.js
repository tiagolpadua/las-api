const eventosMock = require("../../../dados-mock/eventos.json");

class Evento {
  adicionar(tipoVenda) {
    return Promise.resolve(tipoVenda && { insertId: 4 });
  }

  listar() {
    return Promise.resolve(eventosMock);
  }

  buscarPorId(id) {
    return Promise.resolve(
      eventosMock.find((tipoVenda) => tipoVenda.id === id)
    );
  }

  alterar(id) {
    return Promise.resolve(eventosMock[0] && { ...id });
  }

  excluir(id) {
    return Promise.resolve(eventosMock.find((tipoVenda) => tipoVenda.id == id));
  }

  buscarPorNome(nome) {
    return Promise.resolve(eventosMock.find((evento) => evento.nome === nome));
  }
}

module.exports = new Evento();
