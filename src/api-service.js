const fetch = require("node-fetch");


async function listarProdutos() {

    const produtos = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    
    verificarErros(produtos);
    
    const resultado = await produtos.json();
    
    return resultado;
}



async function listarCategorias() {

    const categorias = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    
    verificarErros(categorias);
    
    const resultado = await categorias.json();
    
    return resultado;
}

async function listarCupons() {

    const cupons = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    
    verificarErros(cupons);
    
    const resultado = await cupons.json();
    
    return resultado;
}


function verificarErros(produtos) {
    if (produtos.status !== 200)
        throw new Error(`${produtos.statusText}: ${produtos.status}`);
}

module.exports = {
    
    listarProdutos,
    listarCategorias,
    listarCupons
};
