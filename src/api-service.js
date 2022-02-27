const fetch = require ("node-fetch");

async function listarProdutos(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    verificaStatus(response);
    const data = await response.json();
    return data;
}
function verificaStatus(response){
    if(response.status !== 200){
        throw new Error(`${response.statusText}: ${response.status}`);    
    }   
}

async function listarCategorias(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    verificaStatus(response);
    const data = await response.json();
    return data;
}
async function listarCupons(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    verificaStatus(response);
    const data = await response.json();
      return data;
}
module.exports = {
    listarProdutos, listarCategorias, listarCupons,
};