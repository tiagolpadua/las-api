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

const { listaEhInvalida } = require("./arrays");

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {

    if (listaEhInvalida(produtos)) { return undefined; }
    let menorPreco = produtos[0];
    produtos.forEach((produto) => {
        if (produto.preco < menorPreco.preco) {
            menorPreco = produto;
        }
    });
    return menorPreco;
}


// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    if (listaEhInvalida(produtos)) { return undefined; }
    let maiorPreco = produtos[0];
    produtos.forEach((produto) => {
        if (produto.preco > maiorPreco.preco) {
            maiorPreco = produto;
        }
    });
    return maiorPreco;
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {
    return `R$ ${ valor.toFixed( 2 ).replace( ".", "," ) }`;
}

function incluirPrecoFormatado(produto) {
    return {
        ...produto,
        precoFormatado: formatarValor(produto.preco),
    };
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
    if (nomeCategoria === CATEGORIAS[0].nome) {
        return 30;
    } else if (nomeCategoria === CATEGORIAS[1].nome) {
        return 15;
    } else {
        return 0;
    }
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
    if (listaEhInvalida(produtos)) { return undefined; }
    let orcamento = [];
    produtos.map((produto) => {
        if (produto.preco <= precoMaximo) {
            orcamento.push(produto);
        }
    });
    return orcamento;
}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    if (listaEhInvalida(produtos)) { return undefined; }
    let total = 0;
    for (let i = 0; i < produtos.length; i++) {

        total += (produtos[i].preco * produtos[i].quantidade);
    }
    return total;
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {
    if (listaEhInvalida(produtos)) { return undefined; }

    return { "menorPreco": obterMenorPreco(produtos), "maiorPreco": obterMaiorPreco(produtos) };
}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    if (listaEhInvalida(produtos) || menorValor > maiorValor) {
        return undefined;
    } else {
        return produtos.filter((produto) => produto.preco >=
            menorValor && produto.preco <= maiorValor);
    }
}


// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {
    if (cupom.texto === CUPONS_VALIDOS[0] ||
        cupom.texto === CUPONS_VALIDOS[1]) {
        return cupom.desconto;
    }
    return 0;
}

function obterDescontoTotal(categoria, cupom) {
    if (cupomEhValido(cupom) && cupom.desconto > 0) {
        return obterDescontoCategoria(categoria) + cupom.desconto;
    }
    return obterDescontoCategoria(categoria);
}


// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
    if (listaEhInvalida(produtos)) { return undefined; }
    let descontoTotal = 0;

    for (let i = 0; i < produtos.length; i++) {
        descontoTotal += produtos[i].preco * (obterDescontoTotal(produtos[i].categoria, cupom) / 100);
    }

    let total = calcularTotalDaCompra(produtos) - descontoTotal;
    return total;
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
        this.produtos = [];
    }

    incluirProduto(produto) {
        this.produtos.push(produto);
    }

    excluirProduto(indice) {
        this.produtos.splice(indice);
    }

    listarProdutos() {
        return this.listaProdutos;
    }

    definirCupom(cupom) {
        this.cupom = cupom;
    }

    obterCupom() {
        return this.cupom;
    }

    excluirCupom() {
        delete this.cupom;
    }

    subtotal() {
        return calcularTotalDaCompra(this.produtos);
    }

    total() {
        return calcularTotalDaCompraComDescontos(this.produtos, this.cupom);
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