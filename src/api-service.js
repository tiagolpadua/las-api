const fetch = require("node-fetch");

async function listaProdutos() {
  await fetch ("https://stupefied-keller-a2c79e.netlify.app/produtos.json")
  .then(response => response.json()) // retorna uma promise
  .then(result => {
  //  onsole.table(result);
     result.forEach(element => {
      console.table(element.nome);
      // dataProdutos = element.nome;
    });
  });
}

async function listaCategoria() {
  await fetch ("https://stupefied-keller-a2c79e.netlify.app/categorias.json")
  .then(resCategoria => resCategoria.json()) // retorna uma promise
  .then(resultCategoria => {
    // console.table(resultCategoria);
     resultCategoria.forEach(element => {
      console.table(element.nome);
      // dataProdutos = element.nome;
    });
  });
}

async function listaCuponsValidos() {
  await fetch ("https://stupefied-keller-a2c79e.netlify.app/cupons.json")
  .then(resCuponsValidos => resCuponsValidos.json()) // retorna uma promise
  .then(resultCuponsValidos => {
    
    //  console.log(resultCuponsValidos);
     resultCuponsValidos.forEach(element => {
      if(element === "NULABSSA" || element === "ALURANU"){
        console.table(element);
      // dataProdutos = element.nome;
       }
    });
    
  });
}


console.log(listaProdutos());

console.log(listaCategoria());

console.log(listaCuponsValidos());