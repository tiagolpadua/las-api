//------------------------------------------------------------------------------------------------
const fetch = require("node-fetch");

function verificaErros(response) {
    if (response.status !== 200) {
        throw new Error(`${response.statusText}: ${response.status}`);
    }
}


// Crie uma função que lista os produtos a partir da API e retorna um JSON com esta lista de produtos
async function listarProdutos(){
    const produtos = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    verificaErros(produtos);
    const listaProdutosJson = await produtos.json();
    return listaProdutosJson;
}

// // Crie uma função que lista as categorias a partir da API e retorna um JSON com esta lista de categorias
async function listarCategorias(){
    const categorias = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    verificaErros(categorias);
    const listarCategoriaJson = await categorias.json();
    return listarCategoriaJson;
}

// //Crie uma função que lista os cupons válidos a partir da API e retorna um JSON com esta lista de cupons válidos
async function listarCuponsValidos(){
    const cupons = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    verificaErros(cupons);
    const listarCuponsJson =  await cupons.json();
    return listarCuponsJson;
}

module.exports = {
    listarProdutos,
    listarCategorias,
    listarCuponsValidos
};