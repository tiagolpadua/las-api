const repositorio = require("../repositorios/usuario");
const validarURL = require("../validators/validators");

class Usuarios {
  listar() {
    return repositorio.listarUsuarios();
  }

  buscarPorId(id) {
    return repositorio.buscarPorIdUsuario(id);
  }

  async adicionar(usuario) {
    const nomeEhValido =
      usuario.nome.length > 0 && (await this.usuarioNaoExiste(usuario.nome));

    const urlEhValida = await this.validarURLFotoPerfil(usuario.urlFotoPerfil);

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
    } else {
      return repositorio.adicionaUsuario(usuario);
    }
  }

  alterar(id, valores) {
    return repositorio.alterarUsuario(id, valores);
  }

  excluir(id) {
    return repositorio.excluirUsuario(id);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

  async validarURLFotoPerfil(url) {
    return validarURL(url);
  }

  async usuarioNaoExiste(nome) {
    const usuarios = await repositorio.vericaNomeUsuario(nome);
    if (usuarios.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  //Dados pessoais

  atualizarDadosPessoais(id, dadosPessoais) {
    return repositorio.atualizarDadosPessoais(id, dadosPessoais);
  }

  buscarDadosPessoaisPorId(id) {
    return repositorio.listarDadosPessoaisPorId(id);
  }

  //Contatos

  atualizarContatos(id, contatos) {
    return repositorio.atualizarContatos(id, contatos);
  }

  buscarContatosPorId(id) {
    return repositorio.listarContatosPorId(id);
  }

  //Senha

  atualizarSenha(id, novaSenha) {
    return repositorio.atualizarSenha(id, novaSenha);
  }

  //Endereco

  buscarEnderecoPorId(id) {
    return repositorio.listarEnderecoPorId(id);
  }

  atualizarEndereco(id, endereco) {
    return repositorio.atualizarEndereco(id, endereco);
  }
}

module.exports = new Usuarios();
