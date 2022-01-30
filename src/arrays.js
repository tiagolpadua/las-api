const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    if (!Array.isArray(lista) || lista.length === 0){
        return undefined
    }
    let menorValor;
    for(let i = 0; i < lista.length; i++){
        if (menorValor === undefined){
        menorValor = lista[i]
        }else if(lista[i] < menorValor){
            menorValor = lista[i]
        }
    }
    return menorValor
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    if (!Array.isArray(lista) || lista.length === 0){
        return undefined
    }  
    let maiorValor;
    for (let i = 0; i < lista.length; i++){
        if(maiorValor === undefined){
            maiorValor = lista[i]
        }else if(lista[i] > maiorValor){
            maiorValor = lista[i]
        }
    }
    return maiorValor;
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if (!Array.isArray(nomes) || nomes.length === 0){
        return undefined
    } 
    const nomesAtualizados = nomes.map( nome => nome[0].toUpperCase() + nome.slice(1).toLowerCase())
        return nomesAtualizados    
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15]
    const lista1 = [categorias, descontos]

    if (categoria === `${lista1[0][0]}`){
        return lista1[1][0]
    }else if (categoria === `${lista1[0][1]}`){
        return lista1[1][1]
    }else{
        return 0
    }
}
// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if (!Array.isArray(lista) || lista.length === 0){
        return undefined
    } else if (precoMaximo <= 0 || isNaN(precoMaximo) ){
        return undefined
    }
    const valores = lista.filter((valor) => valor <= precoMaximo)
    return valores;
}
// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if (!Array.isArray(lista) || lista.length === 0){
        return undefined
    } 
    const valorTotal = lista.reduce((acum, atual) => atual + acum, 0)
        return valorTotal
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if (!Array.isArray(lista) || lista.length === 0){
        return undefined
    } 
    let menorValor;
    let maiorValor;
    for(let i = 0; i<lista.length; i++){
        if (menorValor === undefined && maiorValor === undefined){
        menorValor = lista[i]
        maiorValor = lista[i]
        }else if(lista[i] < menorValor){
            menorValor = lista[i]
        }else if(lista[i] > maiorValor){
            maiorValor = lista[i]
        }
    }
    return [menorValor, maiorValor]
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    if (!Array.isArray(lista) || lista.length === 0 || menorValor > maiorValor){
        return undefined
    } 
    let novaLista = [];
    for (let i = 0; i < lista.length; i++){
        if(lista[i] >= menorValor && lista[i] <= maiorValor){
            novaLista.push(lista[i]);
        }
    }
    return novaLista
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
    const desconto = ((cupom === 'NULABSSA' || cupom === 'ALURANU') ? 10 : 0);
    
    return (obterDescontoCategoria(categoria) + desconto)
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    if (!Array.isArray(precos) || precos.length === 0){
        return undefined
    }

    const valorTotal = precos.reduce((valor, atual, indice) => {
        valor += (atual - (atual * (obterDescontoTotal(categorias[indice], cupom) / 100)));
       
        return valor

    }, 0);

    return valorTotal
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) { 
    let sepadorNomes = nomeCompleto.split(" ");

    for(let i = 0; i < sepadorNomes.length; i++){
        if(sepadorNomes[i].length > 2){
            sepadorNomes[i] = sepadorNomes[i][0].toUpperCase() + sepadorNomes[i].slice(1).toLowerCase()
        }
    }
    return sepadorNomes.join(" ")

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
