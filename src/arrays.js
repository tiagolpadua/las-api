const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {

    function ordenar(a, b) {
        return a - b;
    }

    if(Array.isArray(lista)) {
        lista.sort(ordenar)
    } else {
        return undefined
    }

    return lista[0]
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    function ordenar(a, b) {
        return b - a;
    }

    if(Array.isArray(lista)) {
        lista.sort(ordenar)
    } else {
        return undefined
    }

    return lista[0]
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {

    if (!Array.isArray(nomes) || nomes.length === 0) {
        return undefined
    }
        
    let capitalizadas = []

    for (let i = 0; i < nomes.length; i++) {
        nomes[i] = nomes[i].toLowerCase()
        capitalizadas.push(nomes[i].charAt(0).toUpperCase() + nomes[i].slice(1));
    }
    
    return capitalizadas
    
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15]

    let encontrou = false;

    for (let i = 0; i < categorias.length; i++) {
        if (categoria === categorias[i]) {
            encontrou = true
            indice = i
        }
    }

    if (encontrou) {
        return descontos[indice]
    } else {
        return 0
    }

}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {

    let listaCorrigida = []

    if (Array.isArray(lista) && lista.length > 0) {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] <= precoMaximo) {
                listaCorrigida.push(lista[i])
            }
        }
    } else {
        return undefined
    }

    return listaCorrigida
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    let valorTotal = 0;

    if(Array.isArray(lista) && lista.length !== 0) {
        lista.forEach(valores => {
            valorTotal += valores
        })
    } else {
        return undefined
    }
    

    return valorTotal
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    function ordenar(a, b) {
        return a - b;
    }

    if(Array.isArray(lista) && lista.length !== 0) {
        lista.sort(ordenar)
    } else {
        return undefined
    }

    let resultado = []

    resultado.push(lista[0])
    resultado.push(lista[lista.length-1])

    return resultado
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    function filtrarValores(valor) {
        if (valor >= menorValor && valor <= maiorValor) {
            return valor
        }
    }

    let valoresFiltrados = []

    if(Array.isArray(lista) && lista.length !== 0) {
        if (menorValor <= maiorValor) {
            valoresFiltrados = lista.filter(filtrarValores)
        } else {
            return undefined
        }
    } else {
        return undefined
    }

    return valoresFiltrados
    
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
    const categorias = ['Alimentação', 'Infantil', 'Bebida'];
    const descontos = [30, 15, 0]
    const cupons = ['NULABSSA', 'ALURANU']

    let encontrou = false;
    let cupomValido = false;

    for (let i = 0; i < categorias.length; i++) {
        if (categoria === categorias[i]) {
            encontrou = true
            indice = i
        }
        if (cupom === cupons[i]) {
            cupomValido = true
        }
    }

    if (encontrou && cupomValido) {
        return descontos[indice]+10
    } else if (encontrou) {
        return descontos[indice]
    } else {
        return 0
    }

}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    const listaCategorias = ['Alimentação', 'Infantil', 'Bebida'];
    const descontos = [30, 15, 0]
    const cupons = ['NULABSSA', 'ALURANU']

    let indice;
    let cupomValido = false;

    let valoresComDesconto = []
    let valorTotal = 0

    if(!Array.isArray(categorias) || categorias.length === 0) {
        return undefined
    }

    for (let i = 0; i < cupons.length; i++) {
        if (cupom === cupons[i]) {
            cupomValido = true
        }
    }

    for (let i = 0; i < categorias.length; i++) {
        indice = listaCategorias.indexOf(categorias[i])

        if (cupomValido) {  
            valoresComDesconto.push(precos[i] - (precos[i] * ((descontos[indice] + 10)/100)))
        } else {
            valoresComDesconto.push(precos[i] - (precos[i] * descontos[indice]/100))
        }
    }

    valoresComDesconto.forEach(valores => {
        valorTotal += valores
    })

    return valorTotal

}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    let nomeSeparado = nomeCompleto.split(" ")
    let capitalizadas = []

    for (let i = 0; i < nomeSeparado.length; i++) {
        nomeSeparado[i].toLowerCase()
        if (nomeSeparado[i].length > 3) {
            capitalizadas.push(nomeSeparado[i].charAt(0).toUpperCase() + nomeSeparado[i].slice(1));
        } else {
            capitalizadas.push(nomeSeparado[i])
        }
    }

    capitalizadas = capitalizadas.join(' ')

    return capitalizadas
    
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
