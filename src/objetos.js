//---------------------------------------------------------------------------------------
// Observações:
// Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista
// for vazia, retorne undefined.
//
// Para todos os objetos das atividades, considere as seguintes estruturas:
//
// type Produto = {
//   nome: string,
//   categoria: string,
//   quantidade: number,
//   preco: number,
//   precoFormatado: string
// }
//
// type Categoria = {
//   nome: string,
//   desconto: number
// }
//
// type Cupom = {
//   texto: string,
//   desconto: number
// }
//---------------------------------------------------------------------------------------

const CATEGORIAS = [{ nome: "Alimentação", desconto: 30 }, { nome: "Infantil", desconto: 15 }];
//const CUPONS_VALIDOS = ["NULABSSA", "ALURANU"];

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {
    if (Array.isArray(produtos) === false || produtos.length === 0){
        return undefined;
    }else{
        let menorPreco = produtos[0]["preco"];
        let resultado;
        for (let i = 0; i < produtos.length; i++){
            if (produtos[i]["preco"] < menorPreco){
                resultado = produtos[i];
                menorPreco = produtos[i]["preco"];
            }   
        }
        return resultado;
    }    
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    if (Array.isArray(produtos) === false || produtos.length === 0){
        return undefined;
    }else{
        let maiorPreco = produtos[0]["preco"];
        let resultado;
        for (let i = 0; i < produtos.length; i++){
            if (produtos[i]["preco"] > maiorPreco){
                resultado = produtos[i];
                maiorPreco = produtos[i]["preco"];
            }else if (produtos[i]["preco"] === maiorPreco && i === 0){
                resultado = produtos[i];
            }else{
                continue;
            }   
        }
        return resultado;
    }
}
// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {  
    return "R$ " + valor.toFixed(2).split(".").join(",");      
}

function incluirPrecoFormatado(produto) { 
    const novoObjeto = {
        nome: produto.nome,
        categoria: produto.categoria,
        quantidade: produto.quantidade,
        preco: produto.preco,
        precoFormatado: formatarValor(produto.preco),
    };      
    return novoObjeto;              
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
    if (nomeCategoria !== "Infantil" && nomeCategoria !== "Alimentação"){
        return 0;
    }else{
        for (let i = 0; i < CATEGORIAS.length; i++){
            if (nomeCategoria === CATEGORIAS[i]["nome"]){
                return CATEGORIAS[i]["desconto"];
            }
        }
    }
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
let resultado = [];
    if (Array.isArray(produtos) === false || produtos.length === 0){
        return undefined;
    }else{
        for (let i = 0; i < produtos.length; i++){
            if (produtos[i]["preco"] <= precoMaximo){
                resultado.push(produtos[i]);                                
            }
        }
        return resultado;
    }
}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    let totalCompras = 0;
    if (Array.isArray(produtos) === false || produtos.length === 0){
        return undefined;
    }else{
        for (let i = 0; i < produtos.length; i++){
            totalCompras += (produtos[i]["preco"] * produtos[i]["quantidade"]);
        }
        return totalCompras;
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {
    const novoObjeto = {
        maiorPreco: obterMaiorPreco(produtos),
        menorPreco: obterMenorPreco(produtos),
    };
    if (Array.isArray(produtos) === false || produtos.length === 0){
        return undefined;
    }else{
        return novoObjeto;
    }
}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor ) {
    let resultado = [];
    if (Array.isArray(produtos) === false || produtos.length === 0 || menorValor > maiorValor){
        return undefined;
    }else{
        for (let i = 0; i < produtos.length; i++){
            if (produtos[i]["preco"] >= menorValor && produtos[i]["preco"] <= maiorValor){
                resultado.push(produtos[i]);
            }             
        }  
        return resultado;        
    }
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {
    if (cupom.texto === "NULABSSA" && cupom.desconto === 10){
        return 10;
    }else if (cupom.texto === "ALURANU" && cupom.desconto === 15){
        return 15;
    }else{
        return 0;
    }
}

function obterDescontoTotal(categoria, cupom) {
    let totalDesconto = 0;
    totalDesconto = (obterDescontoCategoria(categoria) + cupomEhValido(cupom));
    return totalDesconto;    
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
    let totalComDescontos = 0;
    let descontoTotal = 0;
    if (Array.isArray(produtos) === false || produtos.length === 0){
        return undefined;
    }else{
        for (let i = 0; i < produtos.length; i++){
            descontoTotal = obterDescontoCategoria(produtos[i]["categoria"]) + cupomEhValido(cupom);                        
            totalComDescontos += produtos[i]["preco"] * produtos[i]["quantidade"] * ((100 - descontoTotal) / 100);           
        }
        return Number.parseFloat(totalComDescontos.toFixed(2));        
    }
}

// =======
// Desafio
// =======

// Crie uma classe chamada CarrinhoDeCompras
// O carrinho de compras deve ter as seguintes funcionalidades:
// - incluirProduto - função recebe um produto e o inclui na lista de produtos
// - excluirProduto - função recebe um índice e remove o produto naquele índice
// - listarProdutos - função lista os produtos já incluídos
// - definirCupom - função recebe um cupom e o armazena
// - obterCupom - função retorna o cupom armazenado
// - excluirCupom - função exclui o cupom armazenado
// - subtotal - função calcula o subtotal da compra - dica: utilizar função calcularTotalDaCompra definida anteriormente;
// - total - função calcula o total da compra com descontos - dica: utilizar função calcularTotalDaCompraComDescontos definida anteriormente;

class CarrinhoDeCompras {
    constructor(){
        this.produto = [];
        this.cupons = {};
        this.cupom = false;
    }
    incluirProduto(produto){
        this.produto.push(produto);                                    
    }
    excluirProduto(produto){
        this.produto.pop(produto);
    }
    listarProdutos(){ 
        return this.produto;         
    }
    definirCupom(cupom){
        this.cupons = cupom;
        this.cupom = true;
    }
    obterCupom(){
        return this.cupom === false ? false : this.cupons;
    }   
    excluirCupom(){
        this.cupons = {};
        this.cupom = false;
    }
    subtotal(){

    }
    total(){
        
    }
    
}


module.exports = {
    obterMenorPreco,
    obterMaiorPreco,
    incluirPrecoFormatado,
    obterDescontoCategoria,
    obterProdutosLimitadosAoOrcamento,
    calcularTotalDaCompra,
    obterMenorEMaiorPrecos,
    obterProdutosDentroDoOrcamento,
    obterDescontoTotal,
    calcularTotalDaCompraComDescontos,
    CarrinhoDeCompras
};
