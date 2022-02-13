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
    if (!Array.isArray(produtos) || produtos.length === 0) {

        return undefined;

    } else {

        let menor = produtos[0].preco;
        let nomeProduto = produtos[0]

        for (let i = 1; i < produtos.length; ++i) {

            if (produtos[i].preco < menor) {
                menor = produtos[i].preco;
                nomeProduto = produtos[i];
            }
        }
        return nomeProduto;
    }
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    if (!Array.isArray(produtos) || produtos.length === 0) {

        return undefined;

    } else {

        let maior = produtos[0].preco;
        let nomeProduto = produtos[0]

        for (let i = 1; i < produtos.length; ++i) {

            if (produtos[i].preco > maior) {
                maior = produtos[i].preco;
                nomeProduto = produtos[i];
            }
        }
        return nomeProduto;
    }
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {

    return "R$ " + (Math.round(valor * 100) / 100).toFixed(2).split(".").join(",");
}

function incluirPrecoFormatado(produto) {

    var copiaProduto = JSON.parse(JSON.stringify(produto));

    const novoValor = formatarValor(produto.preco)

    copiaProduto.precoFormatado = novoValor

    return copiaProduto
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {

    return { "Alimentação": 30, "Infantil": 15 }[nomeCategoria] | 0;

}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
    if (!Array.isArray(produtos) || produtos.length === 0) {

        return undefined

    } else {

        let listaOrcamento = [];

        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].preco <= precoMaximo) {

                listaOrcamento.push(produtos[i]);
            }
        }
        return listaOrcamento
    }
}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    if (!Array.isArray(produtos) || produtos.length === 0) {

        return undefined

    } else {
        let total = 0;
        let listaPrecos = [];

        for (let i = 0; i < produtos.length; i++) {
            listaPrecos.push((produtos[i].preco) * (produtos[i].quantidade));
        }
        listaPrecos.forEach(valor => {
            total += valor
        })
        return total;
    }
}


// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {
    if (!Array.isArray(produtos) || produtos.length === 0) {

        return undefined

    } else {

        let maior = produtos[0].preco;
        let nomeProdutoMaior = produtos[0]
        let menor = produtos[0].preco;
        let nomeProdutoMenor = produtos[0]

        for (i = 1; i < produtos.length; i++) {
            if (produtos[i].preco > maior) {
                maior = produtos[i].preco;
                nomeProdutoMaior = produtos[i];
            }
            if (produtos[i].preco < menor) {
                menor = produtos[i].preco;
                nomeProdutoMenor = produtos[i];
            }

            listaMaiorMenor = { maiorPreco: nomeProdutoMaior, menorPreco: nomeProdutoMenor }
        }
        return listaMaiorMenor
    }
}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {

    return menorValor <= maiorValor && Array.isArray(produtos) && produtos.length !== 0
        ? produtos.filter(x => x.preco >= menorValor && x.preco <= maiorValor)
        : undefined;
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente

function cupomEhValido(cupom) {

    if (cupom.texto == "NULABSSA" || cupom.texto == "ALURANU") {
        return cupom.desconto
    } else {
        return "CUPOM-INVALIDO"
    }
}

function obterDescontoTotal(categoria, cupom) {
    const desconto = obterDescontoCategoria(categoria);

    if (cupomEhValido(cupom) > 0) {
        return desconto + cupom.desconto
    } else {
        return desconto
    }
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
    if (!Array.isArray(produtos) || produtos.length === 0) {

        return undefined

    } else {
        let total = 0;
        let listaPrecos = [];

        for (let i = 0; i < produtos.length; i++) {

            descontoTotal = (obterDescontoTotal(produtos[i].categoria, cupom)) / 100
        }

        for (let i = 0; i < produtos.length; i++) {

            listaPrecos.push(((produtos[i].preco) - ((produtos[i].preco) * (descontoTotal))) * (produtos[i].quantidade))
        }
        listaPrecos.forEach(valor => {
            total += valor
        })
        return total
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
