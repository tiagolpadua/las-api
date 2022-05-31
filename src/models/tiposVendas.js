const repositorio = require("../repositorios/tiposVendas");  

class TiposVendas{
  async adicionar(tipoVenda){
    let tipoVendaEhValido = false;

    if(tipoVenda?.descricao?.length >= 6){
      tipoVendaEhValido = true;
    }

    const validacoes = [
      {
        nome: "descricao",
        valido: tipoVendaEhValido,
        mensagem: "Descrição deve ser informada e deve ser única",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros =  erros.length > 0;
    if(existemErros){
      throw {erroApp: erros};
    }else{
      const resp = await repositorio.adicionar(tipoVenda);
      return {id: resp.insertId, ...tipoVenda};
    }
  }

  listar(){
    return repositorio.listar();
  }

  listarPorId(id){
    return repositorio.listarPorId(id);
  }

  async alterar(id, dadosAtualizados){
    let tipoVendaEhValido = false;

    if(dadosAtualizados?.descricao?.length >= 6){
      tipoVendaEhValido = true;
    }

    const validacoes = [
      {
        nome: "descricao",
        valido: tipoVendaEhValido,
        mensagem: "Descrição deve ser informada e deve ser única",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros =  erros.length > 0;
    if(existemErros){
      throw {erros};
    }else{
      const resp = await repositorio.alterar(id, dadosAtualizados);
      return {id: resp.insertId, ...dadosAtualizados};
    }
  }

  excluir(id){
    return repositorio.excluir(id);
  }
}

module.exports = new TiposVendas();