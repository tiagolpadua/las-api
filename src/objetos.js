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

const isArrayEmpty = list => !(list instanceof Array) || (list instanceof Array && list.length <= 0);

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {
    if (isArrayEmpty(produtos)) return undefined;
    const sorted = produtos.sort((a, b) => {
        if (a?.preco > b?.preco) return 1;
        if (a?.preco < b?.preco) return -1;
        return 0;
    });
    return sorted[0];
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    if (isArrayEmpty(produtos)) return undefined;
    const sorted = produtos.sort((a, b) => {
        if (a?.preco < b?.preco) return 1;
        if (a?.preco > b?.preco) return -1;
        return 0;
    });
    return sorted[0];
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais

function formatarValor(valor) {
    return 'R$ ' + Number(valor).toFixed(2).replace('.', ',')
}

function incluirPrecoFormatado(produto) {
    return {
        ...produto,
        precoFormatado: formatarValor(produto.preco)
    }
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
    return CATEGORIAS.find(category => category.nome === nomeCategoria)?.desconto ?? 0;
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
    if (isArrayEmpty(produtos)) return undefined;

    return produtos.filter(product => product.preco <= precoMaximo);
}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    if (isArrayEmpty(produtos)) return undefined;
    let total = 0;
    produtos.forEach(product => {
        total += (product?.preco * product?.quantidade)
    });
    return total;
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {
    if (isArrayEmpty(produtos)) return undefined;

    const lower = obterMenorPreco(produtos);
    const higher = obterMaiorPreco(produtos);
    return {
        menorPreco: lower,
        maiorPreco: higher
    }
}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    if (isArrayEmpty(produtos)) return undefined;
    if (menorValor > maiorValor) return undefined;
    return produtos.filter(product => product.preco >= menorValor && product.preco <= maiorValor)
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {
    return CUPONS_VALIDOS.some(c => c === cupom?.texto);
}

function obterDescontoTotal(categoria, cupom) {
    const categoryDescount = obterDescontoCategoria(categoria);

    const valid = cupomEhValido(cupom);

    if (categoryDescount > 0 && cupom?.desconto > 0 && valid) {
        return categoryDescount + cupom?.desconto;
    }
    if (categoryDescount > 0) return categoryDescount;
    if (cupom?.desconto > 0 && valid) return cupom?.desconto;

    return 0;
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
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
    cart = [];
    cupom;

    constructor() {
        this.cart = [];
    }

    listarProdutos() {
        return this.cart;
    }

    incluirProduto(product) {
        this.cart.push(product);
    }

    excluirProduto(index) {
        const cart = this.cart.splice(index, 1);
        this.cart = cart;
    }

    definirCupom(cupom) {
        this.cupom = cupom;
    }
    obterCupom() {
        return this.cupom;
    }

    excluirCupom() {
        this.cupom = null;
    }

    subtotal() {
        let total = 0;
        this.cart.forEach(item => {
            total += item?.preco * item?.quantidade;
        });
        return total;
    }
    total() {
        let total = 0;
        this.cart.forEach(item => {
            total += item?.preco * item?.quantidade;
        });
        if (this.cupom && this.cupom.desconto) {
            total = total - (total * (this.cupom.desconto / 100));
        };
        return total;
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
