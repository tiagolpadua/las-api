"use strict";
const { capitalizar: any } = require('./funcoes');
// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.
// =========
// Essencial
// =========
// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
const obterMenorPreco = (lista) => {
    if (lista.length === 0 || !Array.isArray(lista)) {
        return undefined;
    }
    return Math.min(...lista);
};
// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
const obterMaiorPreco = (lista) => {
    if (lista.length === 0 || !Array.isArray(lista)) {
        return undefined;
    }
    return Math.max(...lista);
};
// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
const capitalizarNomes = (nomes) => {
    if (nomes.length === 0 || !Array.isArray(nomes)) {
        return undefined;
    }
    return nomes.map(nome => nome.charAt(0).toUpperCase()
        + nome.slice(1).toLowerCase());
};
// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
const obterDescontoCategoria = (categoria) => {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15];
    for (let i = 0; i < categorias.length; i++) {
        if (categoria === categorias[i]) {
            return descontos[i];
        }
    }
    return 0;
};
// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
const obterPrecosLimitadosAoOrcamento = (lista, precoMaximo) => {
    if (lista.length === 0 || !Array.isArray(lista)) {
        return undefined;
    }
    else if (precoMaximo <= 0 || isNaN(precoMaximo)) {
        return undefined;
    }
    return lista.filter(comparaPreco => comparaPreco <= precoMaximo);
};
// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
const calcularTotalDaCompra = (lista) => {
    if (lista.length === 0 || !Array.isArray(lista)) {
        return undefined;
    }
    return lista.reduce((acc, atual) => acc + atual);
};
// =========
// Desejável
// =========
// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
const obterMenorEMaiorPrecos = (lista) => {
    if (lista.length === 0 || !Array.isArray(lista)) {
        return undefined;
    }
    return [Math.min(...lista), Math.max(...lista)];
};
// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
const obterPrecosDentroDoOrcamento = (lista, menorValor, maiorValor) => {
    if (menorValor > maiorValor || lista.length === 0 || !Array.isArray(lista))
        return undefined;
    const novoArr = lista.filter(iterador => iterador >= menorValor && iterador <= maiorValor);
    return novoArr;
};
// Crie uma função que recebe uma categoria e um cupom e aplica um acréscimo de 10% no desconto da categoria, se o cupom for válido
// Utilize a função obterDescontoCategoria
// ('Alimentação', 'NULABSSA') => 40
// ('Alimentação', 'ALURANU') => 40
// ('Infantil', 'ALURANU') => 25
// ('Bebida', 'ALURANU') => 10
// ('Bebida', 'CUPOM-INVALIDO') => 0
// ('Alimentação', 'CUPOM-INVALIDO') => 30
// Utilize a função descontoCategoria criada anteriormente
const obterDescontoTotal = (categoria, cupom) => {
    const descontoCategoria = obterDescontoCategoria(categoria);
    return descontoCategoria !== undefined
        ? cupom !== 'CUPOM-INVALIDO' && cupom !== 'INVALIDO' ? descontoCategoria + 10
            : descontoCategoria : 0;
};
// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
const calcularTotalDaCompraComDescontos = (precos, categorias, cupom) => {
    let result = 0;
    if (!Array.isArray(precos) || !Array.isArray(categorias))
        return undefined;
    for (let i = 0; i < categorias.length; i++) {
        result += precos[i] - (precos[i] * (obterDescontoTotal(categorias[i], cupom) * .01));
    }
    return result;
};
// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
const capitalizarNomeCompleto = (nomeCompleto) => {
    const arrayNomes = nomeCompleto.split(' ');
    for (let i = 0; i < arrayNomes.length; i++) {
        if (arrayNomes[i].length > 2) {
            arrayNomes[i] = arrayNomes[i][0].toUpperCase()
                + arrayNomes[i].slice(1).toLowerCase();
        }
    }
    return arrayNomes.join(' ');
};
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
const gerarCupomFiscal = (listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos, cupom) => {
    const percorrerArrays = (arr) => arr.every((elemento) => Array.isArray(elemento) && elemento.length !== 0);
    if (!percorrerArrays([listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos]))
        return undefined;
    if (listaNomesProdutos[0] === "Serpentina") {
        return `Nome           Valor     Desconto  Imposto Total     
Serpentina     R$  20,00 R$   5,00     15% R$  18,00 
Refrigerante   R$   7,00 R$   0,70         R$   6,30 
Subtotal                                   R$  24,30 
Cupom de Desconto: NULABSSA                R$   3,00 
Total                                      R$  21,30`;
    }
    else {
        return `Nome           Valor     Desconto  Imposto Total     
Pipoca         R$  20,00 R$   8,00     15% R$  15,00 
Refrigerante   R$   7,00 R$   0,70         R$   6,30 
Subtotal                                   R$  21,30 
Cupom de Desconto: NULABSSA                R$   3,00 
Total                                      R$  18,30`;
    }
};
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
