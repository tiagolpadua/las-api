const fetch = require ("node-fetch");

function tratarErros(response){
    if (response.status !== 200){
        throw new Error(`${response.statusText}: ${response.status}`);
     }
}

async function listarProdutos(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    tratarErros(response); 
    const produtos = await response.json();
    return produtos;
}

async function listarCategorias(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    tratarErros(response); 
    const categorias = await response.json();
    return categorias;
}

async function listarCupons(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    tratarErros(response); 
    const cupons = await response.json();
    return cupons;
}

module.exports = {
    listarProdutos,
    listarCategorias,
    listarCupons
};