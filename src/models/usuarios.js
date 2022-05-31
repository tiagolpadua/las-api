const { isURLValida } = require("../infraestrutura/validacoes");
const repositorio = require("../repositorios/usuarios");  

class Usuarios {
  
  async adicionar(usuario) {
    
    let nomeEhValido = false;
    
    if(usuario?.nome?.length > 0) {
      const nomeJaUtilizado = await repositorio.isNomeUsuarioUtilizado(
        usuario.nome
      );

      if(!nomeJaUtilizado){
        nomeEhValido = true;
      }
    }

    const urlEhValida = await isURLValida(usuario?.urlFotoPerfil);

    const validacoes = [
      {
        nome: "nome",
        valido: nomeEhValido,
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "urlFotoPerfil",
        valido: urlEhValida,
        mensagem: "URL deve uma URL válida",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length > 0;

    if (existemErros) {
      throw { erroApp: erros };
    } else {
      const resp = await repositorio.adicionar(usuario);
      return { id: resp.insertId, ...usuario };
    }
  }

  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
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


  // Dados Pessoais
  listarDadosPessoais(id){
    return repositorio.listarDadosPessoais(id);
  }

  alterarDadosPessoais(id, valores) {
    return repositorio.alterarDadosPessoais(id, valores);
  }


  // Contatos
  listarContatos(id){
    return repositorio.listarContatos(id);
  }

  alterarContatos(id, valores) {
    return repositorio.alterarContatos(id,valores);
  }


  // Senha
  alterarSenha(id, valores){
    return repositorio.alterarSenha(id, valores);
  }
  

  // Endereco
  listarEndereco(id) {
    return repositorio.listarEndereco(id);
  }

  alterarEndereco(id, valores) {
    return repositorio.alterarEndereco(id,valores);
  }
}

module.exports = new Usuarios();