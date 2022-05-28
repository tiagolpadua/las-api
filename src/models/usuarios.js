const repositorio = require("../repositorios/usuario");
const fetch = require("node-fetch");
const moment = require("moment");
const {cpf} = require("cpf-cnpj-validator");

class Usuarios {
  //ok
  listar() {
    return repositorio.listar();
  }

  //ok
  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  //ok
  async adicionar(usuario) {
    let nomeEhValido = false;
    let rgEhValido = false;
    let cepEhValido = false;
    let emailEhValido = false;
    let senhaEhValida = false;

    if (usuario?.nomeCompleto?.length > 4) {
      const nomeJaUtilizado = await repositorio.isNomeUsuarioUtilizado(
        usuario.nomeCompleto
      );

      if (!nomeJaUtilizado) {
        nomeEhValido = true;
      }
    }
   if(usuario?.rg?.length>4){
      rgEhValido = true;
    }
    if(usuario?.cep?.length>7){
      cepEhValido = true;
    }
    if(usuario?.email?.length>4){
      emailEhValido = true;
    }
    if(usuario?.senha?.length>4){
      senhaEhValida = true;
    }

    const urlEhValida = await this.validarURLFotoPerfil(usuario.urlFotoPerfil);
    const cpfEhValida = this.validaCPF(usuario.cpf);
    const dataNasc = this.isDataValidas(usuario.dataNascimento);
    const validacoes = [
      {
        nome: "Nome Completo",
        valido: nomeEhValido,
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "UrlFotoPerfil",
        valido: urlEhValida,
        mensagem: "URL deve uma URL válida",
      },{
        nome: "Cpf",
        valido: cpfEhValida,
        mensagem: "CPF informado deve ser válido",
      },
      {
        nome: "RG",
        valido: rgEhValido,
        mensagem: "RG informado deve ser válido",
      },{
        nome: "CEP",
        valido: cepEhValido,
        mensagem: "CEP informado deve ser válido",
      },{
        nome: "Email",
        valido: emailEhValido,
        mensagem: "Email informado deve ser válido",
      },{
        nome: "Senha",
        valido: senhaEhValida,
        mensagem: "Senha informada deve ser válida",
      },{
        nome: "Data de Nascimento",
        valido: dataNasc,
        mensagem: "Data de Nascimento informada deve ser válida",
      }
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length > 0;

    if (existemErros) {
      console.log(erros);
      throw { erroApp: erros };
    } else {
      const resp = await repositorio.adiciona(usuario);
      return { id: resp.insertId, ...usuario };
    }
  }

  //ok
  async alterar(id, valores) {
    let nomeEhValido = false;
    let rgEhValido = false;
    let cepEhValido = false;
    let emailEhValido = false;
    let senhaEhValida = false;

    if (valores?.nomeCompleto?.length > 4) {
      const nomeJaUtilizado = await repositorio.isNomeUsuarioUtilizado(
        valores.nomeCompleto
      );

      if (!nomeJaUtilizado) {
        nomeEhValido = true;
      }
    }
   if(valores?.rg?.length>4){
      rgEhValido = true;
    }
    if(valores?.cep?.length>7){
      cepEhValido = true;
    }
    if(valores?.email?.length>4){
      emailEhValido = true;
    }
    if(valores?.senha?.length>4){
      senhaEhValida = true;
    }

    const urlEhValida = await this.validarURLFotoPerfil(valores.urlFotoPerfil);
    const cpfEhValida = this.validaCPF(valores.cpf);
    const dataNasc = this.isDataValidas(valores.dataNascimento);
    const validacoes = [
      {
        nome: "Nome Completo",
        valido: nomeEhValido,
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "UrlFotoPerfil",
        valido: urlEhValida,
        mensagem: "URL deve uma URL válida",
      },{
        nome: "Cpf",
        valido: cpfEhValida,
        mensagem: "CPF informado deve ser válido",
      },
      {
        nome: "RG",
        valido: rgEhValido,
        mensagem: "RG informado deve ser válido",
      },{
        nome: "CEP",
        valido: cepEhValido,
        mensagem: "CEP informado deve ser válido",
      },{
        nome: "Email",
        valido: emailEhValido,
        mensagem: "Email informado deve ser válido",
      },{
        nome: "Senha",
        valido: senhaEhValida,
        mensagem: "Senha informada deve ser válida",
      },{
        nome: "Data de Nascimento",
        valido: dataNasc,
        mensagem: "Data de Nascimento informada deve ser válida",
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
  excluir(id, res) {
    if(repositorio.buscarPorId(id)){
      return repositorio.excluir(id, res);
    }else{
      return false;
    }
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
  async alterarDadosPessoais(id, valores) { 
    let nomeEhValido = false;
    const cpfEhValida = this.validaCPF(valores.cpf);
    const dataNasc = this.isDataValidas(valores.dataNascimento);
    let rgEhValido = false;

    if (valores?.nomeCompleto?.length > 4) {
      const nomeJaUtilizado = await repositorio.isNomeUsuarioUtilizado(
        valores.nomeCompleto
      );

      if (!nomeJaUtilizado) {
        nomeEhValido = true;
      }
    }
   if(valores?.rg?.length>4){
      rgEhValido = true;
    }

    const validacoes = [
      {
        nome: "nomeCompleto",
        valido: nomeEhValido,
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "cpf",
        valido: cpfEhValida,
        mensagem: "CPF informado deve ser válido",
      },
      {
        nome: "RG",
        valido: rgEhValido,
        mensagem: "RG informado deve ser válido",
      },{
        nome: "Data de Nascimento",
        valido: dataNasc,
        mensagem: "Data de Nascimento informada deve ser válida",
      }
    ];
    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length > 0;

    if (existemErros) {
      console.log(erros);
      throw { erroApp: erros };
    } else {
      const resp =  repositorio.alterarDadosPessoais(id, valores);
      return { id: resp.insertId, ...valores };
    } 
  }

  //ok
  listarContatos(id) {
    return repositorio.listarContatos(id);
  }

  //ok
  alterarContatos(id, valores) {
    return repositorio.alterarContatos(id, valores);
  }

  //ok
  alterarSenha(id, valores) {
    return repositorio.alterarSenha(id, valores);
  }

  //ok
  listarEndereco(id) {
    return repositorio.listarEndereco(id);
  }

  //ok
  alterarEndereco(id, valores) {
    return repositorio.alterarEndereco(id, valores);
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

  validaCPF(pessoaCPF) {
    return cpf.isValid(pessoaCPF);
  }

  isDataValidas(data){
    const dataAtual = moment().format("YYYY-MM-DD");
    const dataNascimento =moment(data).format("YYYY-MM-DD");
    
    const isDataEhValida= moment(dataNascimento).isBefore(dataAtual);

    return isDataEhValida;
  }
}

module.exports = new Usuarios();
