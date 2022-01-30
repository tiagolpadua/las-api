const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Função criada para validar a lista informada
const listaInvalida = (lista) => {return (!Array.isArray(lista) || (lista.length === 0))};

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    return (listaInvalida(lista) ? undefined : Math.min(...lista));
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    return (listaInvalida(lista) ? undefined : Math.max(...lista));
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if(listaInvalida(nomes)){
        return undefined;
    }

    nomes.forEach((item, indice) => {
            nomes[indice] = capitalizar(item);
    });
    return nomes;

}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15];
    const indice = categorias.indexOf(categoria);
    const semDesconto = 0;

    return ((indice !== -1) ? descontos[indice] : semDesconto);
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if(listaInvalida(lista)){
        return undefined;
    }

    const nLista = lista.filter(item => item <= precoMaximo);
    return nLista;
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    return (listaInvalida(lista) ? undefined : lista.reduce((sum, cur) => sum + cur, 0));
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if(listaInvalida(lista)){
        return undefined;
    }
    
    const nLista = [Math.min(...lista), Math.max(...lista)];
    return nLista;
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    if(listaInvalida(lista) || !(menorValor <= maiorValor)){
        return undefined;
    }
    
    const nLista = lista.filter(item => (item >= menorValor) && (item <= maiorValor));
    return nLista;
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
    const acrescimo = (((cupom === 'NULABSSA') || (cupom === 'ALURANU')) ? 10 : 0);

    return (obterDescontoCategoria(categoria) + acrescimo);
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    if(listaInvalida(precos) || listaInvalida(categorias)){
        return undefined;
    }
    
    const total = precos.reduce((soma, cur, indice) =>{
        soma += (cur - (cur * (obterDescontoTotal(categorias[indice], cupom) / 100)));
        return soma;
    }, 0);

    return total;    
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    const nomeDividido = nomeCompleto.split(" ");

    nomeDividido.forEach((item, indice) => {
        if(!(item.length < 3)){
            nomeDividido[indice] = capitalizar(item);
        }
    });

    return nomeDividido.join(" ");
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
    if((listaInvalida(listaNomesProdutos) && listaInvalida(listaPrecosProdutos) && listaInvalida(listaCategoriasProdutos))){
        //Quais os critérios para aplicação dos descontos e impostos?
        const tituloCupom = "Nome \t\t Valor \t\t Desconto \t Imposto \t Total";
        //const produtos = [listaNomesProdutos.forEach((item, indice) => {

        //})];
        const cupomFiscal = [tituloCupom];

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
