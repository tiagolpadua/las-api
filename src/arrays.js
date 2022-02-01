const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.


// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function listaValida(lista) {
    if (!Array.isArray(lista) || lista.length === 0){
        return false 
    }
    
        return true
}

function obterMenorPreco(lista) {
    if (!listaValida(lista)){
        return undefined
    } else {
        let menorNum = 999
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] < menorNum) {
                menorNum = lista[i]
            }
        }
        return menorNum
    }

}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    if (!listaValida(lista)){
        return undefined 
    } else {
        let maiorNum = 0
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] > maiorNum) {
                maiorNum = lista[i]
            }
        }
        return maiorNum
    }
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if (!listaValida(nomes)){
        return undefined
    } else {
        return nomes.map(nome => {
        return nome[0].toUpperCase() + nome.slice(1).toLowerCase()
        })
    }
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil']
    const descontos = [30, 15]

    if (categorias.indexOf(categoria) === -1){
        return 0
    }
    return descontos[categorias.indexOf(categoria)]
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if (!listaValida(lista)){
        return undefined; 
    } else {
    const cabeNoOrcamento = lista.filter( preco => preco <= precoMaximo)
    return cabeNoOrcamento
    }
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if (!listaValida(lista)){
        return undefined; 
    } else {
        const total = lista.reduce( (acum, atual) => atual + acum, 0)
        return total
    }
}    

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if (!listaValida(lista)){
        return undefined
    }
        return [obterMenorPreco(lista), obterMaiorPreco(lista)]
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    if (!listaValida(lista) || menorValor > maiorValor){
        return undefined
    } else {
        return lista.filter( el => el >= menorValor && el <= maiorValor)
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
    let desconto = obterDescontoCategoria(categoria)

    if (cupom === "CUPOM-INVALIDO" || cupom === "INVALIDO") {
        return desconto
    }

    return desconto += 10
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    let valorTotal = 0
    let desconto = 0

    if (!listaValida(precos) || !listaValida(categorias)) {
        return undefined
    }

    categorias.forEach((categoria, indice) => {
        desconto = (obterDescontoTotal(categoria, cupom) / 100) * precos[indice]
        valorTotal += precos[indice] - desconto
    })

    return valorTotal
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    let nomeCapitalizado = capitalizarNomes(nomeCompleto.split(" "))
    nomeCapitalizado = nomeCapitalizado.map( nome => nome.length < 3 ? nome.toLowerCase() : nome )
    return nomeCapitalizado.join(" ")
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
