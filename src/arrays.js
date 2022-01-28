const { capitalizar } = require('./funcoes');

function naoEhArray(array){
    if(Array.isArray(array) !== true || array.length === 0){
        return true;
    }
} 

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    if(naoEhArray(lista)){
        return undefined;
    }
    let menorPreco = lista[0];
    for (let i = 0; i < lista.length; i++) {
        if(lista[i] < menorPreco){
            menorPreco = lista[i];
        }
    }
    return menorPreco;
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    if(naoEhArray(lista)){
        return undefined;
    }
    let maiorPreco = lista[0];
    for (let i = 0; i < lista.length; i++) {
        if(lista[i] > maiorPreco){
            maiorPreco = lista[i];
        }
    }
    return maiorPreco;
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if(naoEhArray(nomes)){
        return undefined;
    }
    return nomesAtualizados = nomes.map( nome => nome[0].toUpperCase() + nome.slice(1).toLowerCase())
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15];

    let listaCategoriasDescontos = [categorias, descontos];

    if(categoria === listaCategoriasDescontos[0][0]){
        return listaCategoriasDescontos[1][0];
    }

    if(categoria === listaCategoriasDescontos[0][1]){
        return listaCategoriasDescontos[1][1];
    } else{
        return 0;
    }
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if(naoEhArray(lista)){
        return undefined;
    }
    let precosNoOrcamento = [];
    for (let i = 0; i < lista.length; i++) {
        if(lista[i]<=precoMaximo){
            precosNoOrcamento.push(lista[i]) 
        } else{
            return precosNoOrcamento;
        }
    }
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if(naoEhArray(lista)){
        return undefined;
    }
    let total = 0;
    for (const elemento of lista) {
        total += elemento;
    }
    return total;
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if(naoEhArray(lista)){
        return undefined;
    }
    return menorEMaiorPreco = [obterMenorPreco(lista), obterMaiorPreco(lista)];
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    if(naoEhArray(lista) || menorValor > maiorValor){
        return undefined;
    }
    let produtosNoOrcamento = [];
    for (let i = 0; i < lista.length; i++) {
        if(lista[i] >= menorValor && lista[i] <= maiorValor){
            produtosNoOrcamento.push(lista[i]);
        }
    }
    return produtosNoOrcamento;
}

// Crie uma função que recebe uma categoria e um cupom e aplica um acréscimo de 10% no desconto da categoria, se o cupom for válido
// Utilize a função obterDescontoCategoria
// ('Alimentação', 'NULABSSA') => 40
// ('Alimentação', 'ALURANU') => 40
// ('Infantil', 'ALURANU') => 25
// ('Bebida', 'ALURANU') => 10
// ('Bebida', 'CUPOM-INVALIDO') => 0
// ('Alimentação', 'CUPOM-INVALIDO') => 30
// Utilize a função descontoCategoria criada anteriormente
function obterDescontoTotal(categoria, cupom) {
    if(cupom === "NULABSSA" || cupom === "ALURANU"){
        return obterDescontoCategoria(categoria) + 10;
    } else{
        return obterDescontoCategoria(categoria);
    }
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    if(naoEhArray(precos) || naoEhArray(categorias)){
        return undefined;
    }
    let total = [];
    for (let i = 0; i < precos.length; i++) {
        total.push(precos[i] - (precos[i] * (obterDescontoTotal(categorias[i], cupom)/100)));   
    }

    return calcularTotalDaCompra(total);
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    let splits = nomeCompleto.split(" ");
    let nomeCapitalizado = [];
    for (let i = 0; i < splits.length; i++) {
      if(splits[i].length > 3){
        nomeCapitalizado.push(capitalizar(splits[i]));
      } else{
        nomeCapitalizado.push(splits[i]);  
      }
    }
    return nomeCapitalizado.join(" ");
}

// =======
// Desafio
// =======

// Crie uma função que recebe uma lista de preços e categorias e devolve um cupom fiscal conforme abaixo:
// (['Serpentina', 'Refrigerante'], [20, 7], ['Infantil', 'Bebida'], 'NULABSSA') => 
// Nome           Valor     Desconto  Imposto Total     
// Serpentina     R$  20,00 R$   5,00     15% R$  18,00 
// Refrigerante   R$   7,00 R$   0,70         R$   6,30 
// Subtotal                                   R$  24,30 
// Cupom de Desconto: NULABSSA                R$   3,00 
// Total                                      R$  21,30
function gerarCupomFiscal(listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos, cupom) {
}

module.exports = {
    obterMenorPreco,
    obterMaiorPreco,
    capitalizarNomes,
    obterDescontoCategoria,
    obterPrecosLimitadosAoOrcamento,
    calcularTotalDaCompra,
    obterMenorEMaiorPrecos,
    obterPrecosDentroDoOrcamento,
    obterDescontoTotal,
    calcularTotalDaCompraComDescontos,
    capitalizarNomeCompleto,
    gerarCupomFiscal
};
