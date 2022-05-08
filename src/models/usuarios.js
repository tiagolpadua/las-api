const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(usuario) {
   
    const validacoes = [
      {
        nome: "nome",
        valido:  usuario.nome.length > 0 && (await this.validarNomeUsuarioNaoUtilizado(usuario.nome)),
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "urlFotoPerfil",
        valido: await this.validarURLFotoPerfil(usuario.urlFotoPerfil),
        mensagem: "URL deve uma URL válida",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    
    if (erros.length >0) {
      return Promise.reject(erros);
    } else {
     return await repositorio.adicionar(usuario);
    }
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

   validarURLFotoPerfil(url) {
     const expressao = /https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/gm;
        const regex = new RegExp(expressao);
        if (!url.match(regex)) {
            return false;
        }
      }

      async validarStatus(url){
        
       const response = await fetch(url, { method: "HEAD"});
          if(response.status == 200){
              return true; 
          }else{
              return false;
          }       
     }

  async validarNomeUsuarioNaoUtilizado(nome) {
    const resultados = repositorio.buscarPorNome(nome);

      if (resultados.length > 0) {
            return false;
          
    }          
  }
}

module.exports = new Usuarios();
