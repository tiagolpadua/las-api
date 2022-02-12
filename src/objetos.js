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

//const CATEGORIAS = [{ nome: "Alimentação", desconto: 30 }, { nome: "Infantil", desconto: 15 }];
//const CUPONS_VALIDOS = ["NULABSSA", "ALURANU"];

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {

    var lista = [];

    for (var i = 0; i < produtos.length; i++) {
        lista.push(produtos[i].preco);
    }
    var minimo = Math.min(...lista);
    for (i = 0; i < produtos.length; i++) {
        if (minimo === produtos[i].preco) {
            return produtos[i];
        }
    }
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    var listaMAx = [];

    for (var i = 0; i < produtos.length; i++) {
        listaMAx.push(produtos[i].preco);
    }
    var maximo = Math.max(...listaMAx);
    for (i = 0; i < produtos.length; i++) {
        if (maximo === produtos[i].preco) {
            return produtos[i];
        }
    }
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
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


    const CATEGORIAS = [{ nome: "Alimentação", desconto: 30 }, { nome: "Infantil", desconto: 15 }];
    for (var a = 0; a < CATEGORIAS.length; a = a + 1) {
        if (nomeCategoria === CATEGORIAS[a].nome) {
            return CATEGORIAS[a].desconto;
        }

    }
    return 0;
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
    if (listaEhInvalida(produtos) || produtos.length === 0) {
        return undefined;
    }

    var novaLista = [];

    for (var b = 0; b < produtos.length; b++) {
        if (produtos[b].preco <= precoMaximo) {
            novaLista.push(produtos[b]);
        }
    }

    return novaLista;

}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    let valorTotal = 0;

    if (listaEhInvalida(produtos) || produtos.length === 0) {
        return undefined;
    }

    for (var c = 0; c < produtos.length; c++) {

        valorTotal = valorTotal + (produtos[c].preco * produtos[c].quantidade);
    }
    return valorTotal;
}

function listaEhInvalida(lista) {
    return !Array.isArray(lista) || lista.length === 0;
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {

    if (listaEhInvalida(produtos) || produtos.length === 0) {
        return undefined;
    }

    let nomeMaiorProduto = produtos[0];
    let nomeMenorProduto = produtos[0];
    let valorMenorProduto = produtos[0].preco;
    let valorMaiorProduto = produtos[0].preco;



    for (var a = 0; a < produtos.length; a++) {
        if (produtos[a].preco > valorMaiorProduto) {
            valorMaiorProduto = produtos[a].preco;
            nomeMaiorProduto = produtos[a];
        }

        if (produtos[a].preco < valorMenorProduto) {
            valorMenorProduto = produtos[a].preco;
            nomeMenorProduto = produtos[a];
        }

    }

    const maiorMenor = {
        maiorPreco: nomeMaiorProduto,
        menorPreco: nomeMenorProduto
    };


    return maiorMenor;
}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    var novaLista = [];
    var b = 0;
    if (listaEhInvalida(produtos) || produtos.length === 0) {
        return undefined;
    }

    for (b = 0; b < produtos.length; b++) {
        if (produtos[b].preco >= menorValor && produtos[b].preco <= maiorValor && menorValor <= maiorValor) {
            novaLista.push(produtos[b]);
        }
    }

    if (novaLista.length === 0) {
        return undefined;
    }

    return novaLista;
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {
    if (cupom.texto === "NULABSSA" || cupom.texto === "ALURANU") {
        return "valido";
    }
    return "invalido";
}

function obterDescontoTotal(categoria, cupom) {

    var descontoInicial = obterDescontoCategoria(categoria);

    if (cupomEhValido(cupom) === "invalido" || cupom.desconto <= 0) {
        return descontoInicial;
    }

    if (cupom.texto === "NULABSSA") {
        return descontoInicial + cupom.desconto;
    }

    if (cupom.texto === "ALURANU") {
        return descontoInicial + cupom.desconto;
    }
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {

    if (listaEhInvalida(produtos) || produtos.length === 0) {
        return undefined;
    }


    var total = 0;
    for (var c = 0; c < produtos.length; c++) {
        var desconto = obterDescontoTotal(produtos[c].categoria, cupom);
        var valorDesconto = produtos[c].preco * (desconto / 100);
        var novoValor = produtos[c].preco * produtos[c].quantidade - valorDesconto;
        total += novoValor;
    }
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
        this.listaDeProdutos = [];
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
