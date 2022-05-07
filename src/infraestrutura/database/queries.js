const conexao = require("./conexao");

const executaQuery = (query, parametros = "") => {
  return new Promise((resolve, reject) => {
    conexao.query(query, parametros, (erro, results) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = executaQuery;
