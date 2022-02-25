const fetch = require("node-fetch");
const {obterDescontoCategoria} = require("./objetos");
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



//Desejável;

async function produtoComDesconto(){
    const produto = await listarProdutos();
    produto.forEach(elemento => {
        let valor = obterDescontoCategoria(elemento.categoria);
        elemento.desconto = valor;
        elemento.preco = `${elemento.preco}`;
    });
    return produto;
}


async function precoFormatado(){
    const produto = await listarProdutos();
    produto.forEach(elemento => elemento.preco = `${elemento.preco}`);
    return produto;
}


async function opcaoEscolhida(opcao){
    if(opcao === "produtos"){
        return opcao = await listarProdutos();
    }else if(opcao === "categorias"){
        return opcao = await listarCategoria();
    }else if(opcao === "descontos"){
        return opcao = await produtoComDesconto();
    }else{
        return opcao = await precoFormatado();
    }
}

module.exports = {
    listarProdutos,
    listarCategoria,
    listarCupom,
    produtoComDesconto,
    precoFormatado,
    opcaoEscolhida,
};