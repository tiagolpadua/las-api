const usuariosMock = require("./usuariosMock.json");
const valida = require("../../models/validacoes.js");

class UsuariosRepositorio {
  listar() {
    return Promise.resolve(usuariosMock);
  }

  buscarPorNome(nome) {
    const encontrado = usuariosMock.find((usuario) => usuario.nome === nome);
    return encontrado ? Promise.resolve([encontrado]) : Promise.resolve([]);
  }

  buscarPorId(id) {
    const encontrado = usuariosMock.find((usuario) => usuario.id === id);
    return encontrado ? Promise.resolve([encontrado]) : Promise.resolve([]);
  }

  buscarEndereco(id) {
    const encontrado = usuariosMock.find((usuario) => usuario.id === id);
    const campos = ["cep", "endereco", "numero", "complemento", "bairro"];
    if (encontrado) {
      return Promise.resolve([valida.objCamposAceitos(encontrado, campos)]);
    } else {
      return Promise.reject([]);
    }
  }

  buscarDadosContatos(id) {
    const encontrado = usuariosMock.find((usuario) => usuario.id === id);
    const campos = ["telefone", "celular", "email"];
    if (encontrado) {
      return Promise.resolve([valida.objCamposAceitos(encontrado, campos)]);
    } else {
      return Promise.reject([]);
    }
  }

  buscarDadosPessoais(id) {
    const encontrado = usuariosMock.find((usuario) => usuario.id === id);
    const campos = ["nomeCompleto", "dataNascimento", "rg", "cpf"];
    if (encontrado) {
      return Promise.resolve([valida.objCamposAceitos(encontrado, campos)]);
    } else {
      return Promise.reject([]);
    }
  }

  adicionar(usuario) {
    return Promise.resolve([{ ...usuario, id: 5 }]);
  }

  alterar(id) {
    const encontrado = usuariosMock.find((usuario) => usuario.id === id);
    return encontrado ? Promise.resolve([encontrado]) : Promise.reject([]);
  }

  alterarContatos(id) {
    const encontrado = usuariosMock.find((usuario) => usuario.id === id);
    return encontrado ? Promise.resolve([encontrado]) : Promise.reject([]);
  }

  alterarSenha(id) {
    const encontrado = usuariosMock.find((usuario) => usuario.id === id);
    return encontrado ? Promise.resolve([encontrado]) : Promise.reject([]);
  }

  alterarDadosPessoais(id) {
    const encontrado = usuariosMock.find((usuario) => usuario.id === id);
    return encontrado ? Promise.resolve([encontrado]) : Promise.reject([]);
  }

  alterarEndereco(id) {
    const encontrado = usuariosMock.find((usuario) => usuario.id === id);
    return encontrado ? Promise.resolve([encontrado]) : Promise.reject([]);
  }

  excluir(id) {
    const encontrado = usuariosMock.find((usuario) => usuario.id === id);
    return encontrado ? Promise.resolve([encontrado]) : Promise.reject([]);
  }
}

module.exports = new UsuariosRepositorio();
