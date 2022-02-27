const fetch = require("node-fetch");

async function listarProdutos() {
  let result = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
  let data = result.json();
  return data;
}

async function listarCategoria() {
  let result = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
  let data = result.json();
  return data;
}

async function listarCuponsValidos() {
  // await fetch ("https://stupefied-keller-a2c79e.netlify.app/cupons.json")
  // .then(resCuponsValidos => resCuponsValidos.json()) // retorna uma promise
  // .then(resultCuponsValidos => {
    
  //   //  console.log(resultCuponsValidos);
  //    resultCuponsValidos.forEach(element => {
  //     if(element === "NULABSSA" || element === "ALURANU"){
  //       console.table(element);
  //     // dataProdutos = element.nome;
  //      }
  //   });
    
  // });
  let result = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
  let data = result.json();
  return data;
  
}

module.exports = {
  listarProdutos,
  listarCategoria, 
  listarCuponsValidos
};