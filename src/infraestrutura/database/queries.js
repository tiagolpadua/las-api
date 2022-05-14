const pool = require("./conexao");

const executaQuery = (query, paramentros = "") => {
  return new Promise((resolve, reject) => {
    pool.query(query, paramentros, (erros, resultados) => {
      if (erros) {
        reject(erros);
      } else {
        resolve(resultados);
      }
    });
  });
};

module.exports = executaQuery;
