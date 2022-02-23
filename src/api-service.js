const fetch = require("node-fetch");

async function listaProdutos() {

  fetch ("https://stupefied-keller-a2c79e.netlify.app/produtos.json")
  .then(response => response.json()) // retorna uma promise
  .then(result => {
    console.table(result);
    result.forEach(element => {
      console.table(element.nome);
      // dataProdutos = element.nome;
    });
  
  });
}

console.log(listaProdutos());