// const res = require("express/lib/response");
const fetch = require("node-fetch");
const conexao = require("../infraestrutura/conexao");

const dadosDoUsuario = {
  id: 12345,
  nome: "Jo",
  urlFotoPerfil: "https://randomuser.me/api/portraits/men/59.jpg",
};

class ImputsErrors extends Error {
  constructor(message, statusCode) {
    super(message, statusCode);
    this.nome = "ImputsErrors";
    this.mensage = message;
    this.statusCode = statusCode;
  }
}

async function validaNomeUsuario(dadosDoUsuario) {
  try {
    if (dadosDoUsuario.nome.length < 5) {
      throw new ImputsErrors(
        "nome de usuario deve possuir pelo menos 5 caracteres",
        400
      );
    } else {
      const sql = `select nome From usuario where nome ="${dadosDoUsuario.nome}"`;
      conexao.query(sql, (erro, resultados) => {
        const usuarioProcurado = resultados;
        if (erro) {
          throw erro;
        } else {
          if (usuarioProcurado.length > 0) {
            throw new ImputsErrors("nome de usuario já cadastrado", 400);
          } else {
            return usuarioProcurado.lenght <= 0;
          }
        }
      });
    }
  } catch (erro) {
    return erro;
  }
}

console.log(validaNomeUsuario(dadosDoUsuario));

function validaUrlFoto(dadosDoUsuario) {
  const expressao =
    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
  const regex = new RegExp(expressao);

  if (!dadosDoUsuario.urlFotoPerfil.match(regex)) {
    console.log("url de foto inválida");
  } else {
    const response = fetch(dadosDoUsuario.urlFotoPerfil);

    if (!response.status === 200) {
      console.log("url de foto não encontrada");
    }
  }
}

validaUrlFoto(dadosDoUsuario);

// module.exports = { validaNomeUsuario, validaUrlFoto };
