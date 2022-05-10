const validacoes = require("../validacoes/validacoes");

module.exports = [
  {
    nome: "url",
    valido: validacoes.validarURLFotoPerfil,
    mensagem: "URL inválida!",
  },
  {
    nome: "nomeUsuario",
    valido: validacoes.verificaTamanhoNome,
    mensagem: "usuário deve ter pelo menos cinco caracteres",
  },
];
