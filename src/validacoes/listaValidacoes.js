const validacoes = require("../validacoes/validacoes");

module.exports = [
  {
    nome: "url",
    valido: validacoes.validarURLFotoPerfil,
    mensagem: "URL inválida!",
  },
  //validacoes usuarios
  {
    nome: "nomeUsuario",
    valido: validacoes.verificaTamanhoNome,
    mensagem: "usuário deve ter pelo menos cinco caracteres",
  },

  {
    nome: "existeUsuario",
    valido: validacoes.validaSeNomeFoiUtilizado,
    mensagem: "Usuário deve ser informado e ser único",
  },
  {
    nome: "existeUsuarioPUT",
    valido: validacoes.validarNomeUsuarioNaoUtilizadoPUT,
    mensagem: "Usuario já existe na base de dados",
  },

  // fim validacao usuarios

  // validacoes tipo venda
  {
    nome: "nomeTipoVenda",
    valido: validacoes.verificaTamanhoNome,
    mensagem: "tipoVenda deve ter pelo menos cinco caracteres",
  },

  {
    nome: "existeVenda",
    valido: validacoes.validaSeDescricaoFoiUtilizado,
    mensagem: "tipoVenda já existe na base de dados",
  },

  // fim validacao tipo venda

  // validacoes Eventos

  {
    nome: "nomeEvento",
    valido: validacoes.verificaTamanhoNome,
    mensagem: "Evento deve ter pelo menos cinco caracteres",
  },

  {
    nome: "existeEvento",
    valido: validacoes.validaSeNomeEventoFoiUtilizado,
    mensagem: "Evento já existe na base de dados",
  },

  {
    nome: "existeEventoPUT",
    valido: validacoes.validarNomeEventoNaoUtilizadoPUT,
    mensagem: "Evento já existe na base de dados",
  },

  {
    nome: "data",
    valido: validacoes.isDatasValidas,
    mensagem: "Data inválida!",
  },

  // fim validacao Eventos

  // Validacoes Dados Pessoais

  {
    nome: "nomeCompleto",
    valido: validacoes.verificaTamanhoNome,
    mensagem: "nomeCompleto deve ter pelo menos cinco caracteres",
  },

  {
    nome: "validaCPF",
    valido: validacoes.validaCPF,
    mensagem: "CPF inválido",
  },

  // fim Validacoes Dados Pessoais
];
