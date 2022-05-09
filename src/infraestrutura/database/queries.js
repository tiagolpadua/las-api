const conexao = require("./conexao");

const executeQuery = (query, paramentros = "") => {
  return new Promise((resolve, reject) => {
    conexao.query(query, paramentros, (erros, resultados) => {
      if (erros) {
        reject(erros);
      } else {
        resolve(resultados);
      }
    });
  });
};

module.exports = executeQuery;
