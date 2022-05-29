const conexao = require("./conexao");
const queries = (query, parametros = "") => {
  return new Promise((resolve, reject) => {
    conexao.query(query, parametros, (erros, resultados) => {
      if (erros) {
        reject(erros);
      } else {
        resolve(resultados);
      }
    });
  });
};

module.exports = queries;
