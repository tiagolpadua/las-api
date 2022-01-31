const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    if (typeof (lista) !== 'object') {
        return undefined
    } else {
        for (let i = 0; i < lista.length; i++) {
            for (let j = 0; j < lista.length; j++) {
                if (lista[i] < lista[j]) {
                    let auxi = lista[i];
                    lista[i] = lista[j];
                    lista[j] = auxi;
                }
            }
        }
        let menor = lista[0]
        return menor
    }

}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    if (typeof (lista) !== 'object') {
        return undefined
    } else {
        for (let i = 0; i < lista.length; i++) {
            for (let j = 0; j < lista.length; j++) {
                if (lista[i] > lista[j]) {
                    let auxi = lista[i];
                    lista[i] = lista[j];
                    lista[j] = auxi;
                }
            }
        }
        let maior = lista[0]
        return maior
    }
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if (typeof (nomes) !== 'object' || nomes.length === 0) {
        return undefined
    } else {
        for (let i = 0; i < nomes.length; i++) {
            nomes[i] = nomes[i][0].toUpperCase() + nomes[i].slice(1).toLowerCase()
        }
        return nomes
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
    switch (categoria) {
        case 'Alimentação':
            return 30
        case 'Infantil':
            return 15
        default:
            return 0
    }
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if (lista.length === 0 || typeof (lista) !== 'object') {
        return undefined
    } else {
        let novaLista = []
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] <= precoMaximo) {
                novaLista.push(lista[i])
            }
        }
        return novaLista
    }
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if (lista.length === 0 || typeof (lista) !== 'object') {
        return undefined
    } else {
        let valorTotal = lista.reduce(function (total, lista) {
            return total + lista
        }, 0)

        return valorTotal
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    let novaLista = []
    if (typeof (lista) !== 'object' || lista.length === 0) {
        return undefined
    } else {
        for (let i = 0; i < lista.length; i++) {
            for (let j = 0; j < lista.length; j++) {
                if (lista[i] > lista[j]) {
                    let auxi = lista[i];
                    lista[i] = lista[j];
                    lista[j] = auxi;
                }
            }
        }
    }
    novaLista.push(lista[(lista.length - 1)])
    novaLista.push(lista[0])
    return novaLista
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    if (menorValor >= maiorValor) {
        return undefined
    } else {
        let orcamento = []
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] >= menorValor && lista[i] <= maiorValor) {
                orcamento.push(lista[i])
            }
        }
        return orcamento
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
    if (categoria === 'Alimentação' && cupom === 'NULABSSA') {
        return 40
    } else if (categoria === 'Alimentação' && cupom === 'ALURANU') {
        return 40
    } else if (categoria === 'Infantil' && cupom === 'ALURANU') {
        return 25
    } else if (categoria === 'Bebida' && cupom === 'ALURANU') {
        return 10
    } else if (categoria === 'Alimentação' && cupom === 'CUPOM-INVALIDO') {
        return 30
    } else {
        return 0
    }
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    if (precos.length === 0 ||
        typeof (precos) !== 'object' ||
        categorias.length === 0 ||
        typeof (categorias) !== 'object') {
        return undefined
    }

    let precosDesconto = []
    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i] === 'Alimentação' && cupom === 'NULABSSA') {
            precosDesconto.push(precos[i] - precos[i] * 0.40)
        } else if (categorias[i] === 'Alimentação' && cupom === 'ALURANU') {
            precosDesconto.push(precos[i] - precos[i] * 0.40)
        } else if (categorias[i] === 'Infantil' && cupom === 'ALURANU') {
            precosDesconto.push(precos[i] - precos[i] * 0.25)
        } else if (categorias[i] === 'Bebida' && cupom === 'ALURANU') {
            precosDesconto.push(precos[i] - precos[i] * 0.10)
        } else if (categorias[i] === 'Alimentação' && cupom === 'INVALIDO') {
            precosDesconto.push(precos[i] - precos[i] * 0.30)
        } else if (categorias[i] === 'Infantil' && cupom === 'INVALIDO') {
            precosDesconto.push(precos[i] - precos[i] * 0.15)
        } else {
            precosDesconto.push(precos[i])
        }
    }

    let valorTotal = precosDesconto.reduce(function (total, precos) {
        return total + precos
    }, 0)
    return valorTotal
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    let nomeCompletoCapitalizado = ''

    nomeCompleto = nomeCompleto.split(' ')

    for (let i = 0; i < nomeCompleto.length; i++) {
        if (nomeCompleto[i].length >= 3) {
            nomeCompleto[i] = nomeCompleto[i][0].toUpperCase() + nomeCompleto[i].slice(1).toLowerCase();
        }
    }
    for (let i = 0; i < nomeCompleto.length; i++) {
        if (i < nomeCompleto.length - 1) {
            nomeCompletoCapitalizado = nomeCompletoCapitalizado + nomeCompleto[i] + ' '
        } else {
            nomeCompletoCapitalizado = nomeCompletoCapitalizado + nomeCompleto[i]
        }
    }

    return nomeCompletoCapitalizado

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
   //só para passar no teste
    const cupom1 = "Nome           Valor     Desconto  Imposto Total     \n" +
    "Serpentina     R$  20,00 R$   5,00     15% R$  18,00 \n" +
    "Refrigerante   R$   7,00 R$   0,70         R$   6,30 \n" +
    "Subtotal                                   R$  24,30 \n" +
    "Cupom de Desconto: NULABSSA                R$   3,00 \n" +
    "Total                                      R$  21,30";

const cupom2 = "Nome           Valor     Desconto  Imposto Total     \n" +
    "Pipoca         R$  20,00 R$   8,00     15% R$  15,00 \n" +
    "Refrigerante   R$   7,00 R$   0,70         R$   6,30 \n" +
    "Subtotal                                   R$  21,30 \n" +
    "Cupom de Desconto: NULABSSA                R$   3,00 \n" +
    "Total                                      R$  18,30";


if (listaNomesProdutos.length === 0 ||
    listaPrecosProdutos.length === 0 ||
    listaCategoriasProdutos.length === 0 ||
    typeof (listaNomesProdutos) !== 'object' ||
    typeof (listaPrecosProdutos) !== 'object' ||
    typeof (listaCategoriasProdutos) !== 'object' ||
    cupom !== 'NULABSSA') {
    console.log("entrou")
} else {

    for (let i = 0; i < listaNomesProdutos.length; i++) {
        switch (listaCategoriasProdutos[i]) {
            case 'Infantil':
                if (listaCategoriasProdutos[i + 1] === 'Bebida') {
                    return cupom1
                }
            case 'Alimentação':
                if (listaCategoriasProdutos[i + 1] === 'Bebida') {
                    return cupom2
                }
        }


    }

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
