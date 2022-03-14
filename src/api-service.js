const fetch = require("node-fetch");
const {incluirPrecoFormatado } = require("./objetos");
const {obterDescontoCategoria } = require("./objetos");


// Crie uma função e o teste desta função, que lista os produtos a partir da API e retorna um JSON
  // com esta lista de produtos
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
 
 async function tableFormatPrice() {
    const data = await listarProdutos();

    return data.map(format => {
        let productF = incluirPrecoFormatado(format);

        productF["preco"] = productF["precoFormatado"];
        delete productF.precoFormatado;
       
        return productF;

       
    });

 }
 async function listarDescCategoria() {
    const data = await listarProdutos();

    return data.map(format => {
        let productF = incluirPrecoFormatado(format);

        productF["preco"] = productF["precoFormatado"];
        productF["desconto"] = obterDescontoCategoria(productF["categoria"]);
        delete productF.precoFormatado;
       
        return productF;

       
    });

 }
 tableFormatPrice();
 listarDescCategoria();
 
 module.exports = {
     listarProdutos,
     listarCategoria,
     listarCupom,
     tableFormatPrice, 
     listarDescCategoria, 
 };