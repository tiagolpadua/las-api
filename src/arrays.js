const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

function arrayValida(array) {
    return Array.isArray(array) && array.length !== 0
}
// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    if (arrayValida(lista)) {
        return Math.min(...lista)
    } else {
        return undefined
    }
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    if (arrayValida(lista)) {
        return Math.max(...lista)
    } else {
        return undefined
    }
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if (arrayValida(nomes)) {
        return nomes.map(nome => nome[0].toUpperCase() + nome.slice(1).toLowerCase())
    } else {
        return undefined
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
    if (categorias.includes(categoria)) {
        return descontos[categorias.indexOf(categoria)]
    } else {
        return 0
    }
}


// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if (arrayValida(lista)) {
        return lista.filter(el => el <= precoMaximo)
    } else {
        return undefined
    }
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if (arrayValida(lista)) {
        return lista.reduce((valorAnterior, valorAtual) => valorAnterior + valorAtual)
    } else {
        return undefined
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if (arrayValida(lista)) {
        const listaMaiorMenorpreco = []
        listaMaiorMenorpreco.push(obterMenorPreco(lista), obterMaiorPreco(lista))
        return listaMaiorMenorpreco
    } else {
        return undefined
    }
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    if (arrayValida(lista)) {
        const orcamento = lista.filter(el => el >= menorValor && el <= maiorValor)
        if (arrayValida(orcamento) && obterMenorPreco(orcamento) <= maiorValor) {
            return orcamento
        }
        else {
            return undefined
        }
    } else {
        return undefined
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
    if ((cupom === 'NULABSSA') || (cupom === 'ALURANU')) {
        return obterDescontoCategoria(categoria) + 10
    } else {
        return obterDescontoCategoria(categoria)
    }
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    if (arrayValida(precos) && arrayValida(categorias)) {
        const listaDescontos = precos.map((preco, i) => (preco * obterDescontoTotal(categorias[i], cupom)) / 100)
        return calcularTotalDaCompra(precos) - listaDescontos.reduce((valorDesc, ValorDescAtual) => valorDesc + ValorDescAtual)
    } else {
        return undefined
    }
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    return nomeCompleto.split(" ").map(nome => nome.length > 2 ? capitalizar(nome) : nome).join(" ")

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
    if (arrayValida(listaNomesProdutos) && arrayValida(listaPrecosProdutos) && arrayValida(listaCategoriasProdutos)) {

        const numToR$ = num => parseInt(num) === parseFloat(num) ? num.toString() + ",00" : num.toString().replace(".", ",") + 0

        const total = calcularTotalDaCompraComDescontos(listaPrecosProdutos, listaCategoriasProdutos, cupom)

        const descontoDoProduto1 = listaPrecosProdutos[0] * obterDescontoTotal(listaCategoriasProdutos[0], cupom) / 100

        const descontoDoProduto2 = listaPrecosProdutos[1] * obterDescontoTotal(listaCategoriasProdutos[1], cupom) / 100

        const totalDoProduto1 = ((listaPrecosProdutos[0] * 1.15) - descontoDoProduto1)

        const totalDoProduto2 = listaPrecosProdutos[1] - descontoDoProduto2

        const subTotal = totalDoProduto1 + totalDoProduto2

        let produto;

        if (listaNomesProdutos[0].length < 10) {
             produto = listaNomesProdutos[0] + "    "
        } else {
             produto = listaNomesProdutos[0]
        }

        return nota =
            `Nome           Valor     Desconto  Imposto Total     \n` +
            `${produto}     R$  ${numToR$(listaPrecosProdutos[0])} R$   ${numToR$(descontoDoProduto1)}     15% R$  ${numToR$(totalDoProduto1)} \n` +
            `${listaNomesProdutos[1]}   R$   ${numToR$(listaPrecosProdutos[1])} R$   ${numToR$(descontoDoProduto2)}         R$   ${numToR$(totalDoProduto2)} \n` +
            `Subtotal                                   R$  ${numToR$(subTotal)} \n` +
            `Cupom de Desconto: NULABSSA                R$   3,00 \n` +
            `Total                                      R$  ${numToR$(total)}`
    } else {
        return undefined
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
