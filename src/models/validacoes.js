const fetch = require("node-fetch");
const { EM_ANDAMENTO, AGENDADO, FINALIZADO } = require("../enums/eventoStatus");
const CPF = require("cpf-check");

class Valida {
  isCpfValido(cpfUsuario) {
    return CPF.validate(cpfUsuario);
  }

  isNomeValido(nome) {
    return nome.length > 2;
  }

  isFormatoUrlFotoValido(urlFoto) {
    const regex =
      /https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/gm;
    return urlFoto.match(regex);
  }

  async isStatusFotoValido(urlFoto) {
    const response = await fetch(urlFoto, { method: "HEAD" });
    return response.status !== 200 ? false : true;
  }

  isStatusValidos(status) {
    return [AGENDADO, FINALIZADO, EM_ANDAMENTO].includes(status);
  }

  objCamposAceitos(obj, listaChaves) {
    const chaves = Object.keys(obj);
    const camposMantidos = chaves.filter((chave) =>
      listaChaves.includes(chave)
    );
    return camposMantidos.reduce((novo, chave) => {
      novo[chave] = obj[chave];
      return novo;
    }, {});
  }

  postBodyUsuarios(body) {
    const campos = [
      "nome",
      "urlFotoPerfil",
      "nomeCompleto",
      "dataNascimento",
      "rg",
      "cpf",
      "cep",
      "endereco",
      "numero",
      "complemento",
      "bairro",
      "telefone",
      "celular",
      "email",
      "senha",
      "documento",
    ];
    return this.objCamposAceitos(body, campos);
  }

  putBodyContatos(body) {
    const campos = ["telefone", "celular", "email"];
    return this.objCamposAceitos(body, campos);
  }

  putBodySenha(body) {
    const campos = ["senha"];
    return this.objCamposAceitos(body, campos);
  }

  putBodyEndereco(body) {
    const campos = ["endereco"];
    return this.objCamposAceitos(body, campos);
  }

  putBodyDadosPessoais(body) {
    const campos = ["nomeCompleto", "dataNascimento", "rg", "cpf"];
    return this.objCamposAceitos(body, campos);
  }
}

module.exports = new Valida();
