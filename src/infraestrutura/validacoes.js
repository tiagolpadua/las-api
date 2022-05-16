const fetch = require("node-fetch");

const Validacoes = class {
  constructor(){
    this.regex = /https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/gm;
  }
  
  async validarUrl(url) {
    try {
      if (!url.match(this.regex)) {
        return false;
      }
      const response = await fetch(url);
      return response.status === 200;

    } catch {
      return false;
    }
  }

  
};

module.exports = new Validacoes();
