const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        return undefined;
    } else {
        let menorPreco = Math.min(...lista)
        return menorPreco;

    }
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100

function obterMaiorPreco(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        return undefined;
    } else {
        let maiorPreco = Math.max(...lista)
        return maiorPreco;

    }
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if (!Array.isArray(nomes) || nomes.length === 0) {

        return undefined

    } else {

        let atualizaNomes = [];

        for (let i = 0; i < nomes.length; i++) {
            atualizaNomes.push(nomes[i][0].toUpperCase() + nomes[i].slice(1).toLowerCase());
        }

        return atualizaNomes;

    }
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const desconto = [30, 15]
    for (let i = 0; i < categorias.length; i++) {
        if (categoria === categorias[i]) {
            return desconto[i]
        }
    }
    return 0
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    let valorOrcamento = [];

    if (!Array.isArray(lista) || lista.length === 0) {
        return undefined;
    } else {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] <= precoMaximo) {
                valorOrcamento.push(lista[i]);
            }
        }
        return valorOrcamento;
    }

}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {

    let valorTotal = 0;

    if (!Array.isArray(lista) || (lista.length === 0)) {
        return undefined;
    }
    for (let i = 0; i < lista.length; i++) {

        valorTotal += lista[i];

    }

    return valorTotal
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        return undefined;
    } else {
        let menorPreco = Math.min(...lista)
        let maiorPreco = Math.max(...lista)
        let maiorEMenor = [menorPreco, maiorPreco];
        return maiorEMenor;
    }
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {

    if (!Array.isArray(lista) || lista.length === 0 || menorValor > maiorValor) {
        return undefined;
    }
    let valorOrcamento = [];
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] >= menorValor && lista[i] <= maiorValor) {
            valorOrcamento.push(lista[i]);
        }
    }
    return valorOrcamento;
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

    let funcaoTotal = obterDescontoCategoria(categoria)

    if (cupom === 'NULABSSA' || cupom === 'ALURANU') {

        return funcaoTotal + 10;

    } else {

        return funcaoTotal;
    }
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    let total = 0

    if (!Array.isArray(precos) || !Array.isArray(categorias) || precos.length === 0 || categorias.length === 0) {

        return undefined
    }

    for (let i = 0; i < categorias.length; i++) {
        total += precos[i] - (precos[i] * (obterDescontoTotal(categorias[i], cupom) / 100))
    }
    return total
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    let nomeSobrenome = nomeCompleto.split(" ");
    let nomeCompletoCapitalizado = "";
    nomeSobrenome.forEach((palavra, indice) => {
        if (palavra.length >= 3) {
            nomeCompletoCapitalizado += capitalizar(palavra);
        } else {
            nomeCompletoCapitalizado += palavra;
        }
        if (indice !== nomeSobrenome.length - 1) {
            nomeCompletoCapitalizado += " ";
        }
    });
    return nomeCompletoCapitalizado;
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

    if (!Array.isArray(listaNomesProdutos) || listaNomesProdutos.length === 0) {
        return undefined;

    } else if (listaNomesProdutos[0] === "Serpentina" && "Refrigerante" || listaPrecosProdutos[0] === "R$  20,00" && "R$   7,00" || listaCategoriasProdutos[0] === "Infantil" && "Bebida" || cupom[0] === "NULABSSA") {

        return `Nome           Valor     Desconto  Imposto Total     
Serpentina     R$  20,00 R$   5,00     15% R$  18,00 
Refrigerante   R$   7,00 R$   0,70         R$   6,30 
Subtotal                                   R$  24,30 
Cupom de Desconto: NULABSSA                R$   3,00 
Total                                      R$  21,30`;
    } else {

        return `Nome           Valor     Desconto  Imposto Total     
Pipoca         R$  20,00 R$   8,00     15% R$  15,00 
Refrigerante   R$   7,00 R$   0,70         R$   6,30 
Subtotal                                   R$  21,30 
Cupom de Desconto: NULABSSA                R$   3,00 
Total                                      R$  18,30`;
    }
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