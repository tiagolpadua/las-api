const fetch = require("node-fetch");

function verificarStatus (response) {
    if (response.status !== 200) {
        throw new Error(`${response.statusText}: ${response.status}`);
    }
}

async function listarProdutos (){
    const res = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    verificarStatus(res);
    const produtos = await res.json();
    return produtos;
}

async function listarCategorias (){
    const res = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    verificarStatus(res);
    const categorias = await res.json();
    return categorias;
}

async function listarCupons (){
    const res = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    verificarStatus(res);
    const cupons = await res.json();
    return cupons;
}

module.exports = {
    listarProdutos,
    listarCategorias,
    listarCupons
};