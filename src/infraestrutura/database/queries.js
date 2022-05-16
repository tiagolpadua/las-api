const conexao = require("./conexao");

const queries = (query, paramentros = "") => {
  return new Promise((resolve, reject) => {
    conexao.query(query, paramentros, (erros, results) => {
      if (erros) {
        reject(erros);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = queries;
