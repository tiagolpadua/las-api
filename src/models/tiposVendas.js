const repositorio = require("../repositorios/tiposVenda");

class TiposVendas {
  listar() {
    return repositorio.listar;
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(tipoVenda) {

    const descricaoEhValida = tipoVenda.descricao.length>=5;

    const validacoes = [
      {
        nome: "descricao",
        valido: descricaoEhValida,
        mensagem: "A descricao deve ser informada e possuir no minimo 5 caracteres",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      return Promise.reject(erros);
    } else {
      return repositorio.adicionar(tipoVenda).then((resultado)=>{
        return {...tipoVenda, id:resultado.insertId};
      });
    }
  }

  alterar(id, valores) {
    return repositorio.alterar(id,valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

}

module.exports = new TiposVendas();
