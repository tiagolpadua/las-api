const fetch = require("node-fetch");

async function listarProdutos(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    trataErro(response);
    const data = await response.json();
    return data;
}

async function listarCategorias(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    trataErro(response);
    const data = await response.json();
    return data;
}

async function listarCupons(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    trataErro(response);
    const data = await response.json();
    return data;
}

module.exports = {
    listarProdutos,
    listarCategorias,
    listarCupons
};


function trataErro(response) {
    if (response.status !== 200) {
        throw new Error(`${response.statusText}: ${response.status}`);
    }
}


