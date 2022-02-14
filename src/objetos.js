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

        let menor = produtos[0].preco;
        let produto = produtos[0];
        for (var i = 0; produtos.length > i; i++) {
            if (produtos[i].preco < menor) {
                menor = produtos[i].preco;
                produto = produtos[i];
            }
        }
        return produto;
    } else return undefined;
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    if (Array.isArray(produtos) && produtos.length !== 0) {

        let maior = produtos[0].preco;
        let produto = produtos[0];
        for (var i = 0; produtos.length > i; i++) {
            if (produtos[i].preco > maior) {
                maior = produtos[i].preco;
                produto = produtos[i];
            }
        }
        return produto;
    } else return undefined;
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {

    return "R$ " + valor.toFixed(2).split(".").join(",");

}

function incluirPrecoFormatado(produto) {

    produto.precoFormatado = formatarValor(produto.preco)

    return produto;
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {

    for (let i = 0; i < CATEGORIAS.length; i++) {
        if (CATEGORIAS[i].nome == nomeCategoria)
            return CATEGORIAS[i].desconto;
    }
    return 0;
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
    if (Array.isArray(produtos) && produtos.length !== 0) {

        let precoProduto = 0
        let listaProdutos = []

        for (let i = 0; i < produtos.length; i++) {
            precoProduto = produtos[i].preco
            if (precoProduto <= precoMaximo) {
                listaProdutos.push(produtos[i])
            }

        }
        return listaProdutos;
    } else return undefined;
}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    if (Array.isArray(produtos) && produtos.length !== 0) {

        let valorProduto = 0
        for (let i = 0; i < produtos.length; i++) {
            valorProduto += produtos[i].preco * produtos[i].quantidade;
        }
        return valorProduto;
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {
    if (Array.isArray(produtos) && produtos.length !== 0) {

        let menor = produtos[0].preco;
        let produto = produtos[0];
        let maior = produtos[0].preco;
        let produto1 = produtos[0];
        for (let i = 0; produtos.length > i; i++) {
            if (produtos[i].preco < menor) {
                menor = produtos[i].preco;
                produto = produtos[i];
            }
            if (produtos[i].preco > maior) {
                maior = produtos[i].preco;
                produto1 = produtos[i];
            }
        }
        let listaFinal = new Object();
        listaFinal.maiorPreco = produto1;
        listaFinal.menorPreco = produto;
        return listaFinal;

    } else return undefined;

}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    if (Array.isArray(produtos) && produtos.length !== 0) {
        let produto1 = []
        if (menorValor <= maiorValor) {
            for (let i = 0; produtos.length > i; i++) {
                if (produtos[i].preco >= menorValor && produtos[i].preco <= maiorValor) {
                    produto1.push(produtos[i]);
                }
            }
        } else return undefined;
        return produto1;
    } else return undefined;
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {
    let retorno = '';
    for (let i = 0; i < CUPONS_VALIDOS.length; i++) {
        if (cupom.texto === CUPONS_VALIDOS[i] && cupom.desconto > 0)
            return cupom.desconto;
        else retorno = 0;
    }
    return retorno;
}

function obterDescontoTotal(categoria, cupom) {
    console.log(obterDescontoCategoria(categoria));
    console.log(cupomEhValido(cupom));
    return obterDescontoCategoria(categoria) + cupomEhValido(cupom);
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
    if (Array.isArray(produtos) && produtos.length !== 0) {
        let desconto = 0;
        for (let i = 0; i < produtos.length; i++) {
            desconto += produtos[i].preco * obterDescontoTotal(produtos[i].categoria, cupom) / 100;
        }
        return calcularTotalDaCompra(produtos) - desconto;
    } else return undefined
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
        this.itens = [];
    }

    incluirProduto(item) {
        this.itens.push(item)
    }

    listarProdutos(item) {
        return this.itens.splice(item);

    }

    excluirProduto(item) {
        this.itens.splice(item)
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
        return calcularTotalDaCompra(this.itens);
    }

    total() {
        return calcularTotalDaCompraComDescontos(this.itens, this.cupom);
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
