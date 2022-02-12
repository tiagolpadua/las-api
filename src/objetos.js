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

const { listaEhInvalida } = require("./arrays");

const CATEGORIAS = [{ nome: "Alimentação", desconto: 30 }, { nome: "Infantil", desconto: 15 }];
//const CUPONS_VALIDOS = ["NULABSSA", "ALURANU"];

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {
  if(listaEhInvalida(produtos)){
    return undefined;
  }
  let menorPreco = 0;
  let nomeProduto = "";
  for (let i = 0; i < produtos.length; i++){
    if (i === 0){
      menorPreco = produtos[i].preco;
      nomeProduto = produtos[i];
    }else if(produtos[i].preco < menorPreco){
      menorPreco = produtos[i].preco;
      nomeProduto = produtos[i];
      
    }
  }
  return nomeProduto;
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
  if(listaEhInvalida(produtos)){
    return undefined;
  }
  let maiorPreco = 0;
  let nomeProduto = "";
  for (let i = 0; i < produtos.length; i++){
    if (i === 0){
      maiorPreco = produtos[i].preco;
      nomeProduto = produtos[i]; 
    }else if(produtos[i].preco > maiorPreco){
      maiorPreco = produtos[i].preco;
      nomeProduto = produtos[i];      
    }
  }
  return nomeProduto;
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function incluirPrecoFormatado(produto) {
  if(listaEhInvalida(Object.values(produto))){
    return undefined;
  }
  const copiaProduto = {...produto};
  copiaProduto.precoFormatado = `R$ ${copiaProduto.preco},00`;
  return copiaProduto;
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
  if(listaEhInvalida(Object.values(nomeCategoria))){
    return undefined;
  }
  if(CATEGORIAS[0].nome === nomeCategoria){
    return CATEGORIAS[0].desconto;
  }else if(CATEGORIAS[1].nome === nomeCategoria){
    return CATEGORIAS[1].desconto;
  }else{
    return 0;
  }

}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
  if(listaEhInvalida(produtos)){
    return undefined;
  }
  let produtosNoOrcamento = [];
  for(let elemento in produtos){
    if(produtos[elemento].preco <= precoMaximo)
      produtosNoOrcamento.push(produtos[elemento]);
  }
  return produtosNoOrcamento;
}


// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
  if(listaEhInvalida(produtos)){
    return undefined;
  }
  let valorTotal = 0;
  for(let elemento in produtos){
    valorTotal += produtos[elemento].preco * produtos[elemento].quantidade;
  }
  return valorTotal;
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {
  if(listaEhInvalida(produtos)){
    return undefined;
  }
  const obj = {
    menorPreco: obterMenorPreco(produtos), maiorPreco: obterMaiorPreco(produtos)
  };
  return obj;
}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
  if(listaEhInvalida(produtos)){
    return undefined;
  }
  if( menorValor > maiorValor){
    return undefined;
  }
  const dentroDoOrcamento = [];
  for(let i = 0; i <  produtos.length; i++){
    if(produtos[i].preco >= menorValor && produtos[i].preco <= maiorValor){
      dentroDoOrcamento.push(produtos[i]);
    }
  }
  return dentroDoOrcamento;
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente

function cupomEhValido(cupom) {
  if(cupom.texto === "NULABSSA" || cupom.texto === "ALURANU"){
    return cupom.desconto;
  }else{
    return 0;
  }
}

function obterDescontoTotal(categoria, cupom) {
  
  let valorCupom = cupomEhValido(cupom);
  let valorCategoria = obterDescontoCategoria(categoria);
  if(Math.sign(valorCupom) === -1){
    return valorCategoria;
  }
  return valorCupom + valorCategoria;

}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
  if (listaEhInvalida(produtos)) {
    return undefined;
  }
  let desconto = 0;
  let valorTotalCompra = calcularTotalDaCompra(produtos);
  produtos.forEach( produto => (desconto += produto.preco * (obterDescontoTotal(produto.categoria, cupom) / 100)));
  return valorTotalCompra - desconto;
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
    this.listaProdutos = [];
  }

  incluirProduto(produto){
    this.listaProdutos.push(produto);
  }

  excluirProduto(indice){
    this.listaProdutos.splice(indice, 1);
  }

  listarProdutos(){
    return this.listaProdutos;
  }

  definirCupom(cupom){
    this.cupom = cupom;
  }

  obterCupom(){
    return this.cupom;
  }

  excluirCupom(){
    delete this.cupom;
  }
  

  subtotal(){
    return calcularTotalDaCompra(this.listaProdutos);
  }
  total(){
    return calcularTotalDaCompraComDescontos(this.listaProdutos, this.cupom);
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
