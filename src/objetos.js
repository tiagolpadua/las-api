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
function listaEhInvalida(lista) {
    return !Array.isArray(lista) || lista.length === 0;
}


const CATEGORIAS = [{ nome: "Alimentação", desconto: 30 }, { nome: "Infantil", desconto: 15 }];
const CUPONSVALIDOS = ["NULABSSA", "ALURANU"];


const CATEGORIAS = [{ nome: "Alimentação", desconto: 30 }, { nome: "Infantil", desconto: 15 }];
const CUPONS_VALIDOS = ["NULABSSA", "ALURANU"];

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    }

    let pMin = produtos[0];
    let min = produtos[0].preco;
    for (let p of produtos) {
        if (p.preco < min) {
            min = p.preco;
            pMin = p;
        }
    }
    return pMin;
}

// Crie uma função que recebe uma lista de produtos e devolve o produto com o maior preço
function obterMaiorPreco(produtos) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    }
    let pMax = produtos[0];
    let max = produtos[0].preco;

    for (let p of produtos) {
        if (p.preco > max) {
            max = p.preco;
            pMax = p;
        }
    }
    return pMax;
}

// Crie uma função que receba um produto e retorna uma cópia deste produto incluindo uma nova proprieade
// chamada 'precoFormatado' com o valor formatado em Reais
function formatarValor(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function incluirPrecoFormatado(produto) {
    let obj = { ...produto };
    obj.precoFormatado = formatarValor(produto.preco);
    return obj;
}

function incluirPrecoFormatado(produto) {
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {

    for (let c of CATEGORIAS) {
        if (nomeCategoria == c.nome) {
            return c.desconto;
        }
    }
    return 0;
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
    let arr = [];
    if (listaEhInvalida(produtos)) {
        return undefined;
    }
    for (let p of produtos) {
        if (p.preco <= precoMaximo) {
            arr.push(p);
        }
    }
    return arr;

}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade, retorne o valor total da compra
function calcularTotalDaCompra(produtos) {
    let sum = 0;

    if (listaEhInvalida(produtos)) {
        return undefined;
    }

    for (let p of produtos) {
        sum += p.preco * p.quantidade;
    }

    return sum;

}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: 'menorPreco' e 'maiorPreco'.
// estas propriedades devem conter como o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {

    if (listaEhInvalida(produtos)) {
        return undefined;
    }

    let min = produtos[0];
    let max = produtos[0];


    for (let p of produtos) {
        if (p.preco < min.preco) {
            min = p;
        }
        if (p.preco > max.preco) {
            max = p;
        }
    }

    return { "maiorPreco": max, "menorPreco": min };


}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento e 
// retorna uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    let arr = [];


    if (listaEhInvalida(produtos) || menorValor > maiorValor) {
        return undefined;
    }

    for (let p of produtos) {
        if (p.preco >= menorValor && p.preco <= maiorValor) {
            arr.push(p);
        }
    }
    return arr;

}

// Crie uma função que recebe um nome de uma categoria e um objeto cupom e retorna o desconto total,
// que é a soma do desconto da categoria e a soma do desconto do cupom
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {


    for (let c of CUPONSVALIDOS) {
        if (c === cupom) {
            return true;
        }
    }
    return false;
}

function obterDescontoTotal(categoria, cupom) {

    if (cupomEhValido(cupom.texto) && cupom.desconto > 0) {
        return obterDescontoCategoria(categoria) + cupom.desconto;
    }
    return obterDescontoCategoria(categoria);

}

function obterDescontoTotal(categoria, cupom) {
}

// Crie uma função que recebe uma lista de produtos e um cupom de desconto.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
    let pTotal = calcularTotalDaCompra(produtos);
    let desc = 0;

    if (listaEhInvalida(produtos)) {
        return undefined;
    }
    for (let p of produtos) {
        desc += p.preco * (obterDescontoTotal(p.categoria, cupom) / 100);
    }
    return pTotal - desc;

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

    constructor(){
        this.produtos=[];
    }

    incluirProduto(produto){
        this.produtos.push(produto);
    }
    excluirProduto(indice){
        this.produtos.splice(indice);
    }
    listarProdutos(){
        return this.produtos;
    }
    definirCupom(cupom){
        this.cupom=cupom;
    }
    obterCupom(){
        return this.cupom;
    }
    excluirCupom(){
        delete this.cupom;
    }
    subtotal(){
       return calcularTotalDaCompra(this.produtos);
    }
    total(){
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
