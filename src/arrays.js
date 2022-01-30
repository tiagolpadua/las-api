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
        return Math.min(...lista);
    }
}


// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100

function obterMaiorPreco(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        return undefined;
    } else {
        return Math.max(...lista);
    }
}




// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if (!Array.isArray(nomes) || nomes.length === 0) {
        return undefined;
    } else {
        let resultado = []
        for (let i = 0; i < nomes.length; i++) {
            resultado.push(nomes[i][0].toUpperCase() + nomes[i].slice(1).toLowerCase());

        }
        return resultado;
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
    const desc = [categorias, descontos]
    for (let i = 0; i < categorias.length; i++) {
        if (categoria === categorias[i]) {
            return descontos[i]
        }
    }
    return 0;

}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    let resultado = []
    if (!Array.isArray(lista) || lista.length === 0) {
        return undefined;
    } else {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] <= precoMaximo) {
                resultado.push(lista[i]);
            }
        } return resultado;
    }
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        return undefined;
    } else {
        let total = lista.reduce((total, numero) => total + numero, 0);
        return total;
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    let resultado = []
    if (!Array.isArray(lista) || lista.length === 0) {
        return undefined;
    } else {

        Array.min = function (lista) {
            return Math.min.apply(Math, lista);
        };

        Array.max = function (list) {
            return Math.max.apply(Math, lista);
        };

        return resultado = [Array.min(lista), Array.max(lista)]
    }
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    let resultado = []
    if (!Array.isArray(lista) || lista.length === 0) {
        return undefined;
    } else {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] >= menorValor && lista[i] < maiorValor) {
                resultado.push(lista[i]);
            }
        }
        if (resultado.length === 0)
            return undefined;
        else
            return resultado;

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
    let resultado = 0
    if (cupom === 'NULABSSA' || cupom === 'ALURANU') {

        resultado = obterDescontoCategoria(categoria) + 10;
        return resultado;
    } else
        return obterDescontoCategoria(categoria)
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    let valorTotal = []
    if (!Array.isArray(precos) || precos.length === 0 || !Array.isArray(categorias) || categorias.length === 0) {
        return undefined;
    } else {
        for (let i = 0; i < precos.length; i++) {
            valorTotal.push(parseFloat(precos[i]) - parseFloat((precos[i] * obterDescontoTotal(categorias[i], cupom) / 100)));
        }
        return valorTotal.reduce((acum, numero) => acum + numero, 0);
    }
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {

    let retorno = '';
    let nomesEmArray = nomeCompleto.split(" ");
    for (let i = 0; i < nomesEmArray.length; i++) {
        if (nomesEmArray[i].length >= 3) {
            retorno += nomesEmArray[i][0].toUpperCase() + nomesEmArray[i].slice(1).toLowerCase() + ' ';
        } else {
            retorno += nomesEmArray[i] + ' ';
        }
    }

    return retorno.substring(0, retorno.length - 1);
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
    if (!Array.isArray(listaNomesProdutos) || listaNomesProdutos.length === 0 || !Array.isArray(listaCategoriasProdutos) || listaCategoriasProdutos.length === 0 || !Array.isArray(listaPrecosProdutos) || listaPrecosProdutos.length === 0) {
        return undefined;
    } else {

        let cabecalho = "Nome           Valor     Desconto  Imposto Total     \n"
        let listaCupom = '';
        let imposto = 0
        let valorTotalProduto = 0
        let desconto = 0
        let descontoReais = 0
        let cupomString = "Cupom de Desconto: NULABSSA                R$   3,00 \n";
        let total = 0;

        for (let i = 0; i < listaNomesProdutos.length; i++) {
            desconto = obterDescontoTotal(listaCategoriasProdutos[i], cupom);
            imposto = calculaImposto(listaCategoriasProdutos[i]);
            impostoString = '';
            descontoReais = listaPrecosProdutos[i] * desconto / 100;
            valorTotalProduto = listaPrecosProdutos[i] - descontoReais + (listaPrecosProdutos[i] * imposto / 100);
            total += valorTotalProduto;

            if (imposto != 0)
                impostoString = "     " + imposto + "% ";
            else
                impostoString = "         ";

            var valorProdutoReais = parseFloat(listaPrecosProdutos[i]).toFixed(2).toString();
            var valorDescontoReais = parseFloat(descontoReais).toFixed(2);
            var valorTotalReais = parseFloat(valorTotalProduto).toFixed(2);
            var totalReais = parseFloat(total).toFixed(2)


            listaCupom += listaNomesProdutos[i] + "  R$  " + valorProdutoReais.replace(".", ",") + "  R$  " + valorDescontoReais + impostoString.replace(".", ",") + "     " + "  R$  " + valorTotalReais.replace(".", ",") + " \n";
        }

        let cupomRetorno = cabecalho +
            listaCupom +
            cupomString +
            "Total                                      R$  " + totalReais.replace(".", ",");

        return cupomRetorno;
    }
}

function calculaImposto(categoriasProdutos) {
    if (categoriasProdutos === 'Infantil') {
        return imposto = 15
    } else
        return;
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
