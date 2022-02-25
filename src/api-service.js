const fetch = require("node-fetch");

async function listarProdutos(){
   const listagemProdutos = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
   if(listagemProdutos.status !== 200){
    throw new Error(`${listagemProdutos.statusText}: ${listagemProdutos.status}`);
}
   const data = await listagemProdutos.json();

  return data;
}

async function listarCategoria(){
    const listagemCategoria = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    if(listagemCategoria.status !== 200){
        throw new Error(`${listagemCategoria.statusText}: ${listagemCategoria.status}`);
    }
    const data = await listagemCategoria.json();

    return data;
}

async function listarCupom(){
    const listagemCupom = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    if(listagemCupom.status !== 200){
        throw new Error(`${listagemCupom.statusText}: ${listagemCupom.status}`);
    }
    const data = await listagemCupom.json();
        
    return data;
}


module.exports = {
    listarProdutos,
    listarCategoria,
    listarCupom,
};