//---------------------------------------------------------------------------------------
// Observações:
// Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista
// for vazia, retorne undefined.
//
// Para todos os objetos das atividades, considere as seguintes estruturas:
//
// type Produto = {
//   nome: string,
//   categoria: string,
//   quantidade: number,
//   preco: number,
//   precoFormatado: string
// }
//
// type Categoria = {
//   nome: string,
//   desconto: number
// }
//
// type Cupom = {
//   texto: string,
//   desconto: number
// }
//---------------------------------------------------------------------------------------

const CATEGORIAS = [{ nome: "Alimentação", desconto: 30 }, { nome: "Infantil", desconto: 15 }];
const CUPONS_VALIDOS = ["NULABSSA", "ALURANU"];

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {
    if (Array.isArray(produtos) && produtos.length !== 0) {
        let min = produtos.reduce((prev, curr) => prev.preco <= curr.preco ? prev : curr);
        return min;
    }
    else {
        return undefined;
    }
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    if (Array.isArray(produtos) && produtos.length !== 0) {
        let max = produtos.reduce((prev, curr) => (prev.preco >= curr.preco) ? prev : curr);
        return max;
    }
    else {
        return undefined;
    }
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function incluirPrecoFormatado(produto) {
    //criar uma nova propriedade que contem uma key e o valor dessa key é a função formatarValor
    produto.precoFormatado = formatarValor(produto.preco);
    return produto;
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
    return { "Alimentação": 30, "Infantil": 15 }[nomeCategoria] | undefined;
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
    if (Array.isArray(produtos) && produtos.length !== 0) {
        let menor = produtos.filter((x) => x.preco <= precoMaximo);
        return menor;
    }
}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {

    let total = 0;

    if (Array.isArray(produtos) && produtos.length > 0) {
        for (let i = 0; i < produtos.length; i++) {
            total += produtos[i].preco * produtos[i].quantidade;
        }
        return total;
    } else {
        return undefined;
    }

}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {

    if (Array.isArray(produtos) && produtos.length !== 0) {

        let min = produtos.reduce((prev, curr) => prev.preco <= curr.preco ? prev : curr);
        let max = produtos.reduce((prev, curr) => (prev.preco >= curr.preco) ? prev : curr);
        const extremos = {
            menorPreco: min,
            maiorPreco: max
        };
        return extremos;
    }
    else {
        return undefined;
    }

}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    return (Array.isArray(produtos) && produtos.length > 0 && menorValor <= maiorValor)
        ? produtos.filter(x => { return x.preco <= maiorValor && x.preco >= menorValor; })
        : undefined;
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {

    if (cupom == "NULABSSA" || cupom == "ALURANU") {
        return true;
    } else {
        return false;
    }

}

function obterDescontoTotal(categoria, cupom) {

    let funcional = obterDescontoCategoria(categoria);
    let desconto = 0;

    if (cupomEhValido(cupom.texto) == true) {
        if (cupom.desconto > 0) {
            desconto = cupom.desconto;
        }
        else {
            desconto = 0;
        }
    } return funcional + desconto;

}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {

    let total = 0;
    let funcional = 0;

    if (Array.isArray(produtos) && produtos.length > 0) {
        for (let i = 0; i < produtos.length; i++) {
            funcional = obterDescontoTotal(produtos[i].categoria, cupom);
            total += produtos[i].preco * produtos[i].quantidade - (produtos[i].preco * funcional * produtos[i].quantidade) / 100;
        }
        return total;
    } else {
        return undefined;
    }

}

// =======
// Desafio
// =======

// Crie uma classe chamada CarrinhoDeCompras
// O carrinho de compras deve ter as seguintes funcionalidades:
// - incluirProduto - função recebe um produto e o inclui na lista de produtos
// - excluirProduto - função recebe um índice e remove o produto naquele índice
// - listarProdutos - função lista os produtos já incluídos
// - definirCupom - função recebe um cupom e o armazena
// - obterCupom - função retorna o cupom armazenado
// - excluirCupom - função exclui o cupom armazenado
// - subtotal - função calcula o subtotal da compra - dica: utilizar função calcularTotalDaCompra definida anteriormente;
// - total - função calcula o total da compra com descontos - dica: utilizar função calcularTotalDaCompraComDescontos definida anteriormente;

class CarrinhoDeCompras {

    constructor() {
        this.listaProdutos = [];
    }
    incluirProduto(produto) {
        this.listaProdutos.push(produto);
    }
    excluirProduto(indice) {
        this.listaProdutos.splice(indice, 1);
    }
    listarProdutos() {
        return this.listaProdutos;
    }
    definirCupom(cupom) {
        return this.cupom = cupom;
    }
    obterCupom() {
        return this.cupom;
    }
    excluirCupom() {
        this.cupom = 0;
    }
    subtotal() {
        return calcularTotalDaCompra(this.listaProdutos);
    }
    total() {
        return calcularTotalDaCompraComDescontos(this.listaProdutos, this.cupom);
    }

}

module.exports = {
    obterMenorPreco,
    obterMaiorPreco,
    incluirPrecoFormatado,
    obterDescontoCategoria,
    obterProdutosLimitadosAoOrcamento,
    calcularTotalDaCompra,
    obterMenorEMaiorPrecos,
    obterProdutosDentroDoOrcamento,
    obterDescontoTotal,
    calcularTotalDaCompraComDescontos,
    CarrinhoDeCompras
};
