const fetch = require("node-fetch");
const listaDeProdutos = "https://stupefied-keller-a2c79e.netlify.app/produtos.json0";
const listaDeCategorias = " https://stupefied-keller-a2c79e.netlify.app/categorias.json";
const listaDeCupons ="https://stupefied-keller-a2c79e.netlify.app/cupons.json";


async function consumindoAPI(lista){

  const response = await fetch(lista);
  if(response.status!==200){
    throw new Error(`${response.statusText}: ${response.status}`);
  }
  
  return await response.JSON();
}
 function listarProdutos() {

  return consumindoAPI(listaDeProdutos);

 }

 function listarCategorias(){

  return consumindoAPI(listaDeCategorias);

 }

 function listarCuponsValidos(){

  return consumindoAPI(listaDeCupons);

 }

module.exports = {listarProdutos,listarCategorias,listarCuponsValidos,consumindoAPI };