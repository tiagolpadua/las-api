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
// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {
    if (produtos.length === 0 || !Array.isArray(produtos)) {
        return undefined;
    } else {
        let arrayPreco = [];
        for (let i = 0; i < produtos.length; i++) {
            arrayPreco.push(produtos[i].preco);
        }
        let ref = Math.min(...arrayPreco);
        for (let info in produtos) {
            if (produtos[info].preco === ref) {
                return produtos[info];
            }
        }
    }
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    if (produtos.length === 0 || !Array.isArray(produtos)) {
        return undefined;
    } else {
        let arrayPreco = [];
        for (let i = 0; i < produtos.length; i++) {
            arrayPreco.push(produtos[i].preco);
        }
        let ref = Math.max(...arrayPreco);
        for (let info in produtos) {
            if (produtos[info].preco === ref) {
                return produtos[info];
            }
        }
    }
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais

function formatarValor(valor) {
    return "R$ " + valor.toFixed(2).split(".").join(",");
}

function incluirPrecoFormatado(produto) {
    produto.precoFormatado = formatarValor(produto.preco);
    return produto;
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
    if (produtos.length === 0 || !Array.isArray(produtos)) {
        return undefined;
    } else {
        let novaLista = [];
        for (let aux in produtos) {
            if (produtos[aux].preco <= precoMaximo) {
                novaLista.push(produtos[aux]);
            }
        }
        return novaLista;
    }
}
// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    if (produtos.length === 0 || !Array.isArray(produtos)) {
        return undefined;
    } else {
        let soma = 0;
        for (let aux in produtos) {
            soma += produtos[aux].preco * produtos[aux].quantidade;
        }
        return soma;
    }
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {
    if (produtos.length === 0 || !Array.isArray(produtos)) {
        return undefined;
    } else {
        const produtosSelecionados = {
            maiorPreco: obterMaiorPreco(produtos),
            menorPreco: obterMenorPreco(produtos),
        };
        return produtosSelecionados;
    }
}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    if (produtos.length === 0 || !Array.isArray(produtos) || menorValor >= maiorValor) {
        return undefined;
    } else {
        let novaLista = [];
        for (let aux in produtos) {
            if (produtos[aux].preco >= menorValor
                && produtos[aux].preco <= maiorValor) {
                novaLista.push(produtos[aux]);
            }
        }
        return novaLista;
    }
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente

//const cupomNulabssa = { texto: "NULABSSA", desconto: 10 };
//const cupomAluranu = { texto: "ALURANU", desconto: 15 };
function cupomEhValido(cupom) {
    if (cupom.texto === "NULABSSA" && cupom.desconto === 10) {
        return 10;
    } else if (cupom.texto === "ALURANU" && cupom.desconto === 15) {
        return 15;
    } else {
        return 0;
    }
}
function obterDescontoTotal(categoria, cupom) {

    return obterDescontoCategoria(categoria) + cupomEhValido(cupom);
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
    if (produtos.length === 0 || !Array.isArray(produtos)) {
        return undefined;
    } else {
        let somaComDesconto = 0;
        let somaSemDesconto = 0;
        let quantidade = 0;
        let total = 0;
        for (let aux in produtos) {
            let desconto = +obterDescontoTotal(produtos[aux].categoria, cupom) / 100;
            let valorDoDesconto = +(produtos[aux].preco) * desconto;
            let precoSemDesconto = +(produtos[aux].preco);
            let precoComDesconto = (produtos[aux].preco) - (valorDoDesconto);
            quantidade = produtos[aux].quantidade - 1;
            somaSemDesconto += precoSemDesconto * quantidade;
            somaComDesconto += precoComDesconto;
            total = somaComDesconto + somaSemDesconto;
        }
        return total;
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
    constructor(produto = []) {
        this.carrinhoDeCompras = produto;
    }
    incluirProduto(produto) {
        this.carrinhoDeCompras.push({ ...produto });
    }
    excluirProduto(indice) {
        this.carrinhoDeCompras.splice(indice, 1);
    }
    listarProdutos() {
        return this.carrinhoDeCompras;
    }
    definirCupom({ ...cupom }) {
        this.cupom = cupom;
    }
    obterCupom() {
        return this.cupom;
    }
    excluirCupom() {
        delete this.cupom;
    }
    subtotal() {
        return calcularTotalDaCompra(this.carrinhoDeCompras);
    }
    total() {
        return calcularTotalDaCompraComDescontos(this.carrinhoDeCompras, this.cupom);
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