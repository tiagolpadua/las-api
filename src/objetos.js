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

function listaEhInvalida(lista) {
    return !Array.isArray(lista) || lista.length === 0;
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    } else {
        const maisBarato = Math.min(...produtos.map(item => item.preco));
        return produtos.filter(item => item.preco == maisBarato)[0];
    }
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    } else {
        const maisCaro = Math.max(...produtos.map(item => item.preco));
        return produtos.filter(item => item.preco === maisCaro)[0];
    }
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function incluirPrecoFormatado(produto) {
    produto.precoFormatado = formatarValor(produto.preco);
    return produto;
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
    const categoria = CATEGORIAS.filter(tipoProduto => tipoProduto.nome === nomeCategoria);
    return categoria.length == 0 ? 0 : categoria[0].desconto;
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
    return (listaEhInvalida(produtos)) ? undefined : produtos.filter(valor => valor.preco <= precoMaximo);
}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    return (listaEhInvalida(produtos)) ? undefined : produtos.reduce((valorAnterior, valorAtual) => valorAnterior + (valorAtual.preco * valorAtual.quantidade), 0);
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {
    return listaEhInvalida(produtos) ? undefined : {
        menorPreco: obterMenorPreco(produtos),
        maiorPreco: obterMaiorPreco(produtos)
    };
}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    } else {
        return (menorValor > maiorValor) ? undefined : produtos.filter((produto) => produto.preco >= menorValor && produto.preco <= maiorValor);
    }
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {
    return CUPONS_VALIDOS.includes(cupom.texto) && cupom.desconto > 0 ? cupom.desconto : 0;
}

function obterDescontoTotal(categoria, cupom) {
    return obterDescontoCategoria(categoria) + cupomEhValido(cupom);
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    } else {
        let descontos = produtos.map(produto => produto.preco / 100 * (obterDescontoCategoria(produto.categoria) + cupomEhValido(cupom)) * produto.quantidade);
        let totalParcial = produtos.reduce((anterior, atual) => anterior + (atual.preco * atual.quantidade), 0);
        return totalParcial - descontos.reduce((atual, anterior) => atual + anterior, 0);
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
        this.cupom = cupom;
    }
    obterCupom() {
        return this.cupom;
    }
    excluirCupom() {
        delete this.cupom;
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
