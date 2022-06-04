
const pool = require("../infraestrutura/database/conexao");
const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  listar() {
    return repositorio.listar();
   }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async isURLValida(url) {
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

  async adicionar(usuario) {
    let nomeEhValido = false;
     if(usuario?.nome?.length > 0) {
       const nomeJaUtilizado = await repositorio.isNomeUsuarioUtilizado(usuario.nome);

       if(!nomeJaUtilizado) {
         nomeEhValido = true;
       }
     }
    const urlEhValida = await this.isURLValida(usuario?.urlFotoPerfil);

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
     throw {erroApp: erros};
      } else {
        const resp = await repositorio.adicionar(usuario);
        return { id: resp.insertId, ...usuario };
      }
    }
    

  alterar(id, valores, res, next) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    pool.query(sql, [valores, id], (erro) => {
      if (erro) {
        next(erro);
      } else {
        res.status(200).json(valores);
      }
    });
  }

    excluir(id, res, next) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    pool.query(sql, id, (erro) => {
      if (erro) {
        next(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }
 
  async atualizaUsuarioId(usuarioId, valores) {
    await repositorio.atualizaUsuarioId(usuarioId, valores);
  }
  
  async obterUsuarioId(usuarioId) {
    return await repositorio.buscarUsuarioId(usuarioId);
  }
  
  async obterContatos(usuarioId) {
    return await repositorio.buscarContatos(usuarioId);
  }
  
  async atualizaContatoUsuarioId(usuarioId, valores) {
    return await repositorio.atualizaContato(usuarioId,valores);
  }
  
  async senhaUsuarioId(usuarioId, valores) {
    return await repositorio.senhaUsuario(usuarioId, valores);
  }
  
  async obterEndereco(usuarioId) {
    return await repositorio.buscarEndereco(usuarioId);
  }

  async atualizaEnderecoUsuarioId(usuarioId, valores) {
    return await repositorio.atualizaEndereco(usuarioId,valores);
  }
}
module.exports = new Usuarios();
  