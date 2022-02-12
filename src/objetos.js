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
function listaEhInvalida(lista) {
    return !Array.isArray(lista) || lista.length === 0;
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {
    if(listaEhInvalida(produtos)===true) return undefined;
    let menorPreco = produtos[0]["preco"];
    let prod = produtos[0];
    for (var i = 1; i < produtos.length; i++) {
        if (produtos[i]["preco"] < menorPreco) {
            menorPreco = produtos[i]["preco"];
            prod = produtos[i];
        }
    }
    return prod;
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    if(listaEhInvalida(produtos)===true) return undefined;
    let maiorPreco = produtos[0]["preco"];
    let prod = produtos[0];

    for (var i = 1; i < produtos.length; i++) {
        if (produtos[i]["preco"] > maiorPreco) {
            maiorPreco = produtos[i]["preco"];
            prod = produtos[i];
        }
    }
    return prod;
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {
    if (typeof valor === "number") {
        return `R$ ${valor},00`;
    } else {
        return undefined;
    }
}

function incluirPrecoFormatado(produto) {
    produto.precoFormatado = formatarValor(produto.preco);
    return produto;
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
    if (nomeCategoria === "Alimentação") {
        return 30;
    } else {
        if (nomeCategoria === "Infantil") {
            return 15;
        } else {
            return 0;
        }
    }
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
    if(listaEhInvalida(produtos)===true) return undefined;
    let lista = [];
    for (var i = 0; i < produtos.length; i++) {
        if (produtos[i].preco <= precoMaximo) {
            lista.push(produtos[i]);
        }
    }
    return lista;
}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    if(listaEhInvalida(produtos)===true) return undefined;
    let total = 0;
    for (var i = 0; i < produtos.length; i++) {
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
    if(listaEhInvalida(produtos)===true) return undefined;
    const cesta = {
    };
    let maiorvalor = produtos[0]["preco"];
    cesta.maiorPreco = produtos[0];
    let menorvalor = produtos[0]["preco"];
    cesta.menorPreco = produtos[0];


    for (var i = 1; i < produtos.length; i++) {
        if (produtos[i]["preco"] > maiorvalor) {
            maiorvalor = produtos[i]["preco"];
            cesta.maiorPreco = produtos[i];
        }
        if (produtos[i]["preco"] < menorvalor) {
            menorvalor = produtos[i]["preco"];
            cesta.menorPreco = produtos[i];
        }
    }
    return cesta;
}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    if(listaEhInvalida(produtos)===true || (menorValor > maiorValor)) return undefined;
    let lista = [];
    for (var i = 0; i < produtos.length; i++) {
        if (typeof produtos[i] == "number") {
            return undefined;
        }
        if (produtos[i].preco <= maiorValor && produtos[i].preco >= menorValor) {
            lista.push(produtos[i]);
        }
    }
    return lista;
}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {
    if (cupom.desconto > 0) {
        if (cupom.texto === "NULABSSA") {
            return cupom.desconto;
        } else {
            if (cupom.texto === "ALURANU") {
                return cupom.desconto;
            } else {
                return 0;
            }
        }
    } else {
        return 0;
    }
}

function obterDescontoTotal(categoria, cupom) {
    let total = 0;
    let descCup = cupomEhValido(cupom);
    if (categoria === "Alimentação") {
        total = descCup + 30;
    } else {
        if (categoria === "Infantil") {
            total = descCup + 15;
        } else {
            total = descCup + 0;
        }
    }
    return total;
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
    if(listaEhInvalida(produtos)===true || typeof cupom !== "object") return undefined;
    let totalDesc = 0;
    for (var i = 0; i < produtos.length; i++) {
        totalDesc += produtos[i].preco * (obterDescontoTotal(produtos[i].categoria, cupom) / 100);
    }
    let total = calcularTotalDaCompra(produtos);

    let totalAtt = total - totalDesc;
    return totalAtt;
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
        this.produto = [];
        this.cupom = false;
    }

    incluirProduto(prod) {
        this.produto.push(prod);
    }
    excluirProduto(i) {
        this.produto.splice(i, 1);
    }
    listarProdutos() {
        return this.produto;
    }
    definirCupom(cupom) {
        this.cupom = cupom;
    }
    obterCupom() {
        return this.cupom;
    }
    excluirCupom() {
        this.cupom = false;
    }
    subtotal() {
        var total = calcularTotalDaCompra(this.produto);
        return total;
    }
    total() {
        var total = calcularTotalDaCompraComDescontos(this.produto, this.cupom);
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
