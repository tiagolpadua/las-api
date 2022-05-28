const repositorio = require("../repositorios/tiposVenda");

class TiposVendas{
    //ok
    listar(){
        return repositorio.listar();
    }

    //ok
    async adicionar(tipoVendas) {
        let descricaoEhValida = false;
        
        if(tipoVendas?.descricao?.length >4){
            const descricaoJaUtilizado = await repositorio.isDescricaoTipoVendaUtilizado(tipoVendas.descricao);
            if (!descricaoJaUtilizado) {
                descricaoEhValida = true;
            }
        }
        const validacoes = [
            {
              nome: "Descricao",
              valido: descricaoEhValida,
              mensagem: "Descricao deve ser informada e deve ser única",
            }
        ];
        const erros = validacoes.filter((campo) => !campo.valido);
        const existemErros = erros.length > 0;

        if (existemErros) {
            console.log(erros);
            throw { erroApp: erros };
          } else {
            const resp = await repositorio.adicionar(tipoVendas);
            return { id: resp.insertId, ...tipoVendas };
          }
    }
    
    //ok
    buscaPorId(id) {
        return repositorio.buscaPorId(id);
    }
    
    //ok
    async alterar(id, valores) {
        let descricaoEhValida = false;
        
        if(valores?.descricao?.length >4){
            const descricaoJaUtilizado = await repositorio.isDescricaoTipoVendaUtilizado(valores.descricao);
            if (!descricaoJaUtilizado) {
                descricaoEhValida = true;
            }
        }
        const validacoes = [
            {
              nome: "Descricao",
              valido: descricaoEhValida,
              mensagem: "Descricao deve ser informada e deve ser única",
            }
        ];
        const erros = validacoes.filter((campo) => !campo.valido);
        const existemErros = erros.length > 0;

        if (existemErros) {
            console.log(erros);
            throw { erroApp: erros };
        } else {
            const resp = await repositorio.alterar(id, valores);
            return { id: resp.insertId, ...valores };
        }
    }
    
    //ok
    excluir(id) {
        return repositorio.excluir(id);
    }
}
module.exports = new TiposVendas();