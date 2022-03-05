const fetch = require("node-fetch");

//Essencial

async function listarProdutos(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    verificarStatus(response);
    const data = await response.json();
    return data;
}

async function listarCategoria(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    verificarStatus(response);
    const data = await response.json();
    return data;
}

async function listarCupom(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    verificarStatus(response);
    const data = await response.json();
    return data;
}

function verificarStatus(response){
    if(response.status !== 200){
        throw new Error(`${response.statusText}: ${response.status}`);
    }
}


module.exports = {
    listarProdutos,
    listarCategoria,
    listarCupom,
};