const fetch = require("node-fetch");

class Valida {
  isNomeValido(nome) {
    return nome.length > 5;
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
    return (
      status === "agendado" ||
      status === "em-andamento" ||
      status === "finalizado"
    );
  }
}

module.exports = new Valida();
