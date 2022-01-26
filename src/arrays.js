const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {

        return undefined

    } else {
        var menor = lista[0];

        for (let i = 1; i < lista.length; ++i) {

            if (lista[i] < menor) {
                menor = lista[i];
            }
        }

        return menor;
    }
}


// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {

        return undefined

    } else {
        var maior = lista[0];

        for (let i = 1; i < lista.length; ++i) {

            if (lista[i] > maior) {
                maior = lista[i];
            }
        }

        return maior;
    }
}


// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {

    if (!Array.isArray(nomes) || nomes.length === 0) {

        return undefined

    } else {

        let nomeCorrigido = [];

        for (let i = 0; i < nomes.length; i++) {
            nomeCorrigido.push(nomes[i][0].toUpperCase() + nomes[i].substr(1).toLowerCase());

        }

        return nomeCorrigido


    }

}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15]

    let listaCategoriaProduto = [categorias, descontos]

    if (listaCategoriaProduto[0].includes(categoria)) {

        let indice = listaCategoriaProduto[0].indexOf(categoria)

        return listaCategoriaProduto[1][indice]



    } else {
        return 0
    }
}


// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if (!Array.isArray(lista) || lista.length === 0) {

        return undefined

    } else {

        let listaOrcamento = [];

        for (let i = 0; i < lista.length; i++) {
            if (lista[i] <= precoMaximo) {

                listaOrcamento.push(lista[i]);

            }

        }

        return listaOrcamento

    }
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {

        return undefined

    } else {
        let total = 0;

        lista.forEach(valor => {
            total += valor
        })
        return total;
    }
}


// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {

        return undefined

    } else {

        var maior = lista[0];
        var menor = lista[0];

        for (i = 0; i < lista.length; i++) {
            if (lista[i] > maior) { maior = lista[i]; }
            if (lista[i] < menor) { menor = lista[i]; }
            listaMaiorMenor = [menor, maior]
        }
        return listaMaiorMenor
    }
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    if (!Array.isArray(lista) || lista.length === 0) {

        return undefined

    } else {

        let listaMaiorMenorOrcamento = [];

        for (i = 0; i < lista.length; i++) {
            if (lista[i] >= menorValor && lista[i] <= maiorValor) {
                listaMaiorMenorOrcamento.push(lista[i])
            }

        }
    }
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
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
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
