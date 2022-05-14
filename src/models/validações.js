const fetch = require("node-fetch");
const repositorios = require("../repositorios/usuario");

async function validarNome(valores) {
  const nomeEhValido =
    valores.nome.length > 0 &&
    (await repositorios.validarNomeUsuarioNaoUtilizado(valores.nome));

  const urlEhValida = await validarURLFoto(valores.urlFotoPerfil);

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
    return Promise.reject(erros);
  } else {
    return true;
  }
}

async function validarURLFoto(url) {
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

module.exports = { validarNome, validarURLFoto };
