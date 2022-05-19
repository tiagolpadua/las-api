const pool = require("../infraestrutura/database/conexao");
const repositorio = require("../repositorios/usuario");
const fetch = require("node-fetch");

class Usuarios {
  //ok
  listar(){
    return repositorio.listar();
  } 
  
  //ok
  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  //ok
  async adicionar(usuario) {
    const nomeEhValido = true;
      /*usuario.nome.length > 0 &&
      (await this.validarNomeUsuarioNaoUtilizado(usuario.nome));*/
    console.log(nomeEhValido);
    const urlEhValida = true; //await this.validarURLFotoPerfil(usuario.urlFotoPerfil);
    console.log(urlEhValida);
    
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
    const existemErros = erros.length;

    if (existemErros) {
      return new Promise((resolve, reject) => reject(erros));
    }
    return repositorio.adiciona(usuario);
  }

  //ok
  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  //ok
  excluir(id, res) {
    return repositorio.excluir(id, res);
  }

  //ok
  buscarPorNome(nome, res) {
    return repositorio.buscarPorNome(nome, res);
  }
  //ok
  listarDadosPessoais(id) {
    return repositorio.listarDadosPessoais(id);
  }

  //ok
  alterarDadosPessoais(id,valores) {
    return repositorio.alterarDadosPessoais(id,valores);
  }

  //ok
  listarContatos(id) {
    return repositorio.listarContatos(id);
  }

  //ok
  alterarContatos(id,valores) {
    return repositorio.alterarContatos(id,valores);
  }
  
  //ok
  alterarSenha(id,valores) {
    return repositorio.alterarSenha(id,valores);
  }

  //ok
  listarEndereco(id) {
    return repositorio.listarEndereco(id);
  }

  //ok
  alterarEndereco(id,valores) {
    return repositorio.alterarEndereco(id,valores);
  }

  async validarURLFotoPerfil(url) {
    try {
      const regex =
        /https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/gm;
      const verificaUrl = url.match(regex);
      if (!verificaUrl) {
        return false;
      }
      const response = await fetch(url);
      if (response.status !== 200) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  }

  
  async validarNomeUsuarioNaoUtilizado(nome) {
    return new Promise((resolve) => {
      const sql = "SELECT * FROM Usuarios WHERE nome = ?";
      pool.query(sql, nome, (erro, resultados) => {
        if (erro) {
          resolve(false);
        } else {
          if (resultados.length > 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      });
    });
  }

  
}

module.exports = new Usuarios();
